// app/api/spots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase/supabase"

export type Spot = {
  id: string;
  name: string;
  area: string;
  genre: string[];
  type: "indoor" | "outdoor";
  detail: string[];
  image_url: string;
  description: string;
  address: string;
  openHours: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const area = searchParams.getAll("area");
  const genre = searchParams.getAll("genre");
  const type = searchParams.get("type");
  const detail = searchParams.getAll("detail");

  let query = supabase.from("spots").select("*");

  if (area.length > 0) {
    query = query.in("area", area);
  }

  if (type) {
    query = query.eq("type", type);
  }

  if (genre.length > 0) {
    query = query.overlaps("genre", genre);
  }

  if (detail.length > 0) {
    query = query.overlaps("detail", detail);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

