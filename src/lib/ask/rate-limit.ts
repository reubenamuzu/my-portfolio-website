import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { LIMITS } from "./config";

const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; window: "minute" | "day"; retryAfter: number };

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

type Options = { perMinute: number; perDay: number };

/**
 * Keeps counts in this server process's memory.
 *
 * Fine for local development and a single server. On serverless hosts such as
 * Vercel each instance has its own memory and it is wiped on a cold start, so
 * the limits are looser than they look. Set the Upstash variables for a limit
 * that holds across instances.
 */
export class MemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly options: Options = LIMITS,
    private readonly now: () => number = Date.now,
    private readonly maxKeys = 5_000,
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    const time = this.now();
    const today = (this.hits.get(key) ?? []).filter((at) => time - at < DAY);
    const lastMinute = today.filter((at) => time - at < MINUTE);

    if (today.length >= this.options.perDay) {
      this.hits.set(key, today);
      return { ok: false, window: "day", retryAfter: secondsUntil(today[0] + DAY, time) };
    }
    if (lastMinute.length >= this.options.perMinute) {
      this.hits.set(key, today);
      return { ok: false, window: "minute", retryAfter: secondsUntil(lastMinute[0] + MINUTE, time) };
    }

    today.push(time);
    this.hits.set(key, today);
    this.prune(time);
    return { ok: true };
  }

  /** Stops the map growing without bound if many different visitors arrive. */
  private prune(time: number): void {
    if (this.hits.size <= this.maxKeys) return;
    for (const [key, stamps] of this.hits) {
      if (stamps.every((at) => time - at >= DAY)) this.hits.delete(key);
    }
    // Still too big: drop the oldest entries (a Map keeps insertion order).
    for (const key of this.hits.keys()) {
      if (this.hits.size <= this.maxKeys) break;
      this.hits.delete(key);
    }
  }
}

/** Shared limits stored in Upstash Redis, so they hold across server instances. */
export class UpstashRateLimiter implements RateLimiter {
  private readonly minute: Ratelimit;
  private readonly day: Ratelimit;

  constructor(url: string, token: string, options: Options = LIMITS) {
    const redis = new Redis({ url, token });
    this.minute = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(options.perMinute, "60 s"),
      prefix: "ask:minute",
    });
    this.day = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(options.perDay, "1 d"),
      prefix: "ask:day",
    });
  }

  async check(key: string): Promise<RateLimitResult> {
    const [minute, day] = await Promise.all([this.minute.limit(key), this.day.limit(key)]);
    const time = Date.now();
    if (!day.success) return { ok: false, window: "day", retryAfter: secondsUntil(day.reset, time) };
    if (!minute.success) {
      return { ok: false, window: "minute", retryAfter: secondsUntil(minute.reset, time) };
    }
    return { ok: true };
  }
}

/** Uses the primary limiter, and the backup if the primary throws (e.g. Redis is down). */
export class FallbackRateLimiter implements RateLimiter {
  constructor(
    private readonly primary: RateLimiter,
    private readonly backup: RateLimiter,
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    try {
      return await this.primary.check(key);
    } catch {
      console.warn("[ask] shared rate limiter failed, using the in-memory one");
      return this.backup.check(key);
    }
  }
}

type Env = Record<string, string | undefined>;

/** Upstash when its variables are set (either naming scheme), otherwise in-memory. */
export function createRateLimiter(env: Env = process.env): RateLimiter {
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  const memory = new MemoryRateLimiter();
  if (!url || !token) return memory;
  return new FallbackRateLimiter(new UpstashRateLimiter(url, token), memory);
}

let shared: RateLimiter | undefined;

/** One limiter for the life of the server process. */
export function getRateLimiter(): RateLimiter {
  shared ??= createRateLimiter();
  return shared;
}

/**
 * A stable key for the visitor, taken from their IP address.
 * The address is hashed so the raw IP is never kept in memory or in Redis.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

function secondsUntil(target: number, time: number): number {
  return Math.max(1, Math.ceil((target - time) / 1000));
}
