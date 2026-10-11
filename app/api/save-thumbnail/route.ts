import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { name, dataUrl } = await req.json();
    if (!name || !dataUrl) {
      return NextResponse.json({ error: "Missing name or dataUrl" }, { status: 400 });
    }
    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");
    const outPath = path.join(process.cwd(), "public/products", `${name}.png`);
    fs.writeFileSync(outPath, buffer);
    return NextResponse.json({ ok: true, file: `${name}.png` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
