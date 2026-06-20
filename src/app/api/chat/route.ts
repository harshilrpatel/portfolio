import { NextRequest, NextResponse } from "next/server";

const SPACE_URL = "https://harshilrpatel96-chatwithmyai.hf.space";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const submitRes = await fetch(`${SPACE_URL}/gradio_api/call/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [message, history ?? []] }),
    });

    if (!submitRes.ok) {
      return NextResponse.json({ error: "Space unavailable" }, { status: 503 });
    }

    const { event_id } = await submitRes.json();

    const resultRes = await fetch(`${SPACE_URL}/gradio_api/call/chat/${event_id}`, {
      signal: AbortSignal.timeout(30_000),
    });

    const text = await resultRes.text();

    // Parse SSE: find the "complete" event's data line
    let response = "";
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "event: complete") {
        const dataLine = lines[i + 1] ?? "";
        if (dataLine.startsWith("data: ")) {
          const parsed = JSON.parse(dataLine.slice(6));
          response = Array.isArray(parsed) ? String(parsed[0]) : String(parsed);
          break;
        }
      }
    }

    return NextResponse.json({ response });
  } catch (err) {
    console.error("[/api/chat]", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
