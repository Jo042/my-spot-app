// app/api/spots/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/src/db/drizzle";
import { spots } from "@/src/db/spotSchema";
import { sql, and, eq } from "drizzle-orm";

// DBのスキーマが camelCase なら、型も合わせるのがおすすめ（imageUrl 等）
export type Spot = {
  id: string;
  name: string;
  area: string[];                // ← 配列カラム
  genre: string[];
  type: "indoor" | "outdoor";
  detail: string[];
  imageUrl: string;              // ← camelCase（schemaに合わせる）
  description: string;
  address: string;
  openHours: string;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const areas  = searchParams.getAll("area").filter(Boolean);   // string[]
    const genres = searchParams.getAll("genre").filter(Boolean);  // string[]
    const details= searchParams.getAll("detail").filter(Boolean); // string[]
    const type   = searchParams.get("type") as Spot["type"] | null;

    const preds = [];

    // area: text[] に対して、指定配列と“どれか重なればOK”
    // 例）areas の overlaps（text[]同士の &&）
    if (areas.length) {
      preds.push(
        sql<boolean>`(${spots.area}) && ${sql.raw(`ARRAY[${areas.map((_,i)=>`$${i+1}`).join(",")}]::text[]`)}`
      );
    }
    if (genres.length) {
      preds.push(
        sql<boolean>`(${spots.genre}) && ${sql.raw(`ARRAY[${areas.map((_,i)=>`$${i+1}`).join(",")}]::text[]`)}`
      );
    }
    if (details.length) {
      preds.push(
        sql<boolean>`(${spots.detail}) && ${sql.raw(`ARRAY[${areas.map((_,i)=>`$${i+1}`).join(",")}]::text[]`)}`
      );
    }

    if (type) preds.push(eq(spots.type, type));

    const rows = await db
      .select()
      .from(spots)
      .where(preds.length ? and(...preds) : undefined);

    return NextResponse.json(rows, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message ?? "Internal Error" }, { status: 500 });
  }
}



// // app/api/spots/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "@/src/lib/supabase/supabase"

// export type Spot = {
//   id: string;
//   name: string;
//   area: string;
//   genre: string[];
//   type: "indoor" | "outdoor";
//   detail: string[];
//   image_url: string;
//   description: string;
//   address: string;
//   openHours: string;
// };

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const area = searchParams.getAll("area");
//   const genre = searchParams.getAll("genre");
//   const type = searchParams.get("type");
//   const detail = searchParams.getAll("detail");

//   let query = supabase.from("spots").select("*");

//   if (area.length > 0) {
//     query = query.in("area", area);
//   }

//   if (type) {
//     query = query.eq("type", type);
//   }

//   if (genre.length > 0) {
//     query = query.overlaps("genre", genre);
//   }

//   if (detail.length > 0) {
//     query = query.overlaps("detail", detail);
//   }

//   const { data, error } = await query;

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json(data);
// }

