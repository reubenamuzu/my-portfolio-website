import { handleAsk } from "@/lib/ask/handler";

// Runs on the server only. The API key is read inside handleAsk and never
// reaches the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request): Promise<Response> {
  return handleAsk(request);
}
