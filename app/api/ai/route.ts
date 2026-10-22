import { NextResponse } from "next/server";

// Server-side placeholder for AI integrations.
// Add your provider SDK here and keep API keys in server environment variables.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({
      error: "AI belum dikonfigurasi. Tambahkan GEMINI_API_KEY di environment variables server.",
      demo: true,
      received: { task: body.task ?? "unknown" }
    }, { status: 200 });
  }
  // TODO: call Gemini using process.env.GEMINI_API_KEY.
  // Validate input, add rate limits, and never expose the secret to client code.
  return NextResponse.json({
    error: "Endpoint AI masih berupa kerangka. Hubungkan SDK Gemini di route ini.",
    demo: true
  }, { status: 200 });
}