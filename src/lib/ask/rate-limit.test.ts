import { describe, expect, it, vi } from "vitest";
import {
  clientKey,
  createRateLimiter,
  FallbackRateLimiter,
  MemoryRateLimiter,
  type RateLimiter,
} from "./rate-limit";

const MINUTE = 60_000;

/** A limiter with small limits and a clock the test controls. */
function setup(perMinute = 3, perDay = 5) {
  const clock = { time: 1_000_000 };
  const limiter = new MemoryRateLimiter({ perMinute, perDay }, () => clock.time);
  return { limiter, clock };
}

describe("MemoryRateLimiter", () => {
  it("allows requests up to the per-minute limit, then blocks", async () => {
    const { limiter } = setup();
    for (let i = 0; i < 3; i++) expect(await limiter.check("a")).toEqual({ ok: true });

    expect(await limiter.check("a")).toEqual({ ok: false, window: "minute", retryAfter: 60 });
  });

  it("allows requests again once the minute has passed", async () => {
    const { limiter, clock } = setup();
    for (let i = 0; i < 3; i++) await limiter.check("a");
    expect((await limiter.check("a")).ok).toBe(false);

    clock.time += MINUTE;
    expect(await limiter.check("a")).toEqual({ ok: true });
  });

  it("reports how long is left to wait", async () => {
    const { limiter, clock } = setup();
    for (let i = 0; i < 3; i++) await limiter.check("a");

    clock.time += 45_000;
    expect(await limiter.check("a")).toEqual({ ok: false, window: "minute", retryAfter: 15 });
  });

  it("does not let blocked attempts push the wait further out", async () => {
    const { limiter, clock } = setup();
    for (let i = 0; i < 3; i++) await limiter.check("a");

    clock.time += 30_000;
    for (let i = 0; i < 10; i++) await limiter.check("a"); // all blocked

    clock.time += 30_000;
    expect(await limiter.check("a")).toEqual({ ok: true });
  });

  it("enforces the daily limit across minutes", async () => {
    const { limiter, clock } = setup(3, 5);
    for (let i = 0; i < 5; i++) {
      expect(await limiter.check("a")).toEqual({ ok: true });
      clock.time += MINUTE;
    }

    const blocked = await limiter.check("a");
    expect(blocked.ok).toBe(false);
    expect(!blocked.ok && blocked.window).toBe("day");

    clock.time += 24 * 60 * MINUTE;
    expect(await limiter.check("a")).toEqual({ ok: true });
  });

  it("tracks each visitor separately", async () => {
    const { limiter } = setup();
    for (let i = 0; i < 3; i++) await limiter.check("a");

    expect((await limiter.check("a")).ok).toBe(false);
    expect(await limiter.check("b")).toEqual({ ok: true });
  });

  it("forgets old visitors instead of growing without limit", async () => {
    const clock = { time: 0 };
    const limiter = new MemoryRateLimiter({ perMinute: 3, perDay: 5 }, () => clock.time, 10);
    for (let i = 0; i < 50; i++) await limiter.check(`visitor-${i}`);

    // Private field, read here only to check the cap is respected.
    const size = (limiter as unknown as { hits: Map<string, number[]> }).hits.size;
    expect(size).toBeLessThanOrEqual(10);
  });
});

describe("FallbackRateLimiter", () => {
  it("uses the backup when the primary fails", async () => {
    const primary: RateLimiter = { check: vi.fn().mockRejectedValue(new Error("redis down")) };
    const backup: RateLimiter = { check: vi.fn().mockResolvedValue({ ok: true }) };
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(await new FallbackRateLimiter(primary, backup).check("a")).toEqual({ ok: true });
    expect(backup.check).toHaveBeenCalledWith("a");
    warn.mockRestore();
  });

  it("does not touch the backup when the primary works", async () => {
    const primary: RateLimiter = {
      check: vi.fn().mockResolvedValue({ ok: false, window: "minute", retryAfter: 5 }),
    };
    const backup: RateLimiter = { check: vi.fn() };

    expect((await new FallbackRateLimiter(primary, backup).check("a")).ok).toBe(false);
    expect(backup.check).not.toHaveBeenCalled();
  });
});

describe("createRateLimiter", () => {
  it("uses memory when no Upstash variables are set", () => {
    expect(createRateLimiter({})).toBeInstanceOf(MemoryRateLimiter);
  });

  it("uses Upstash, with memory as backup, when its variables are set", () => {
    const limiter = createRateLimiter({
      UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
      UPSTASH_REDIS_REST_TOKEN: "token",
    });
    expect(limiter).toBeInstanceOf(FallbackRateLimiter);
  });

  it("also accepts the Vercel KV variable names", () => {
    const limiter = createRateLimiter({
      KV_REST_API_URL: "https://example.upstash.io",
      KV_REST_API_TOKEN: "token",
    });
    expect(limiter).toBeInstanceOf(FallbackRateLimiter);
  });
});

describe("clientKey", () => {
  const request = (headers: Record<string, string>) => new Request("http://localhost/api/ask", { headers });

  it("gives the same visitor the same key and different visitors different keys", () => {
    const a1 = clientKey(request({ "x-forwarded-for": "203.0.113.7" }));
    const a2 = clientKey(request({ "x-forwarded-for": "203.0.113.7" }));
    const b = clientKey(request({ "x-forwarded-for": "203.0.113.8" }));
    expect(a1).toBe(a2);
    expect(a1).not.toBe(b);
  });

  it("uses the first address in a forwarded chain", () => {
    expect(clientKey(request({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe(
      clientKey(request({ "x-forwarded-for": "203.0.113.7" })),
    );
  });

  it("never contains the raw IP address", () => {
    expect(clientKey(request({ "x-forwarded-for": "203.0.113.7" }))).not.toContain("203.0.113.7");
  });

  it("still returns a key when no address is known", () => {
    expect(clientKey(request({}))).toMatch(/^[0-9a-f]{32}$/);
  });
});
