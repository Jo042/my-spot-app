import "dotenv/config";
import db from "../db/drizzle";
import { spots } from "../db/spotSchema";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { sql } from "drizzle-orm"; 

// CSVの1行をそのまま表す型
type CsvRow = {
  id?: string;
  name: string;
  area: string;
  genre: string;
  type: string;
  detail: string;
  description: string;
  image_url: string;
  address: string;
  open_hours: string;
};

const csvFilePath = path.join(__dirname, "../../public/data/spots.csv");

function toArray(value: string): string[] {
  if (!value) return [];
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) return arr.map(String);
    } catch (e) {
      console.warn("JSON.parseに失敗しました。値:", value);
    }
  }
  return trimmed.split(",").map(s => s.trim()).filter(Boolean);
}

async function importCsvData() {
  try {
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const rows: CsvRow[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
      trim: true,
    });

    if (!rows.length) {
      console.log("CSVにレコードがありません。終了します。");
      process.exit(0);
    }

    const records = rows.map((r) => ({
      name: r.name,
      area: toArray(r.area),
      genre: toArray(r.genre),
      type: r.type,
      detail: toArray(r.detail),
      description: r.description,
      imageUrl: r.image_url,
      address: r.address,
      openHours: r.open_hours,
    }));

    console.log(`挿入または更新する件数: ${records.length}`);
    await db
  .insert(spots)
  .values(records)
  .onConflictDoUpdate({
    target: spots.name,            // name をユニークキーにしている前提
    set: {
      area: sql`EXCLUDED.area`,    // ← 配列は EXCLUDED.* をそのまま使う
      genre: sql`EXCLUDED.genre`,
      type: sql`EXCLUDED.type`,
      detail: sql`EXCLUDED.detail`,
      description: sql`EXCLUDED.description`,
      imageUrl: sql`EXCLUDED.image_url`,
      address: sql`EXCLUDED.address`,
      openHours: sql`EXCLUDED.open_hours`,
    },
      });
    
    console.log("挿入・更新完了 ✅");
    process.exit(0);
  } catch (error: any) {
    console.error("挿入時エラー ❌", error?.message || error);
    if (error?.cause) console.error("cause:", error.cause);
    process.exit(1);
  }
}

importCsvData();