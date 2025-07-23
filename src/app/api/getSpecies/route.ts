import { fetchData } from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const data = await fetchData();

    if (id) {
      const dino = data.find((d) => String(d.id) === id);
      if (!dino) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(dino);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database select failed" },
      { status: 500 },
    );
  }
}
