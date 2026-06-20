import { NextResponse } from "next/server";

const SPACE_API = "https://huggingface.co/api/spaces/harshilrpatel96/ChatWithMyAI";
const SPACE_URL = "https://harshilrpatel96-chatwithmyai.hf.space";

export async function GET() {
  try {
    const res = await fetch(SPACE_API, { cache: "no-store" });
    const data = await res.json();
    const stage: string = data?.runtime?.stage ?? "UNKNOWN";

    if (stage === "SLEEPING") {
      fetch(SPACE_URL).catch(() => {});
    }

    return NextResponse.json({ stage });
  } catch {
    return NextResponse.json({ stage: "UNKNOWN" });
  }
}
