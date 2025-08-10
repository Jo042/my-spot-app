// src/db/upload.ts
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import { sql } from "drizzle-orm";
import db from "./drizzle";
import { spots } from "./spotSchema";

// ---- ESM対応 __dirname 相当
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- CSV 1行の型（ヘッダーと一致）
type CsvRow = {
  id?: string;
  name: string;
  area: string;         // '["渋谷","原宿"]' or '渋谷,原宿'
  genre: string;        // 同上
  type: string;         // "室内" | "屋外"
  detail: string;       // '["雨の日OK","デート向き"]' or カンマ区切り
  description: string;
  image_url: string;
  address: string;
  open_hours: string;
};

// ---- CSVパス（環境変数で上書き可）
const csvFilePath = path.join(__dirname, "../../../public/data/spots.csv");

// ---- ユーティリティ
function toArray(value: string): string[] {
  if (!value) return [];
  const s = value.trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr)) return arr.map(String);
    } catch (e) {
      console.warn("JSON.parseに失敗:", e);
    }
  }
  return s.split(",").map((v) => v.trim()).filter(Boolean);
}

function toError(e: unknown): Error {
  if (e instanceof Error) return e;
  if (typeof e === "string") return new Error(e);
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error("Internal Error");
  }
}

// ---- メイン
async function main() {
  console.log("[upload] csv:", csvFilePath);

  if (!fs.existsSync(csvFilePath)) {
    console.error("[upload] CSVが見つかりません:", csvFilePath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvFilePath, "utf-8");
  const rows: CsvRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  });

  if (!rows.length) {
    console.log("[upload] CSVが空です。終了します。");
    process.exit(0);
  }

  const records = rows.map((r) => ({
    // id は省略すれば uuid().defaultRandom() が発火
    name: r.name,
    area: toArray(r.area),
    genre: toArray(r.genre),
    type: r.type,
    detail: toArray(r.detail),
    description: r.description,
    imageUrl: r.image_url,  // ← schemaのcamelCaseに合わせる
    address: r.address,
    openHours: r.open_hours, // ← schemaのcamelCaseに合わせる
  }));

  console.log("[upload] 挿入/更新件数:", records.length);

  await db
    .insert(spots)
    .values(records)
    .onConflictDoUpdate({
      target: spots.name, // name に UNIQUE 必須
      set: {
        area: sql`EXCLUDED.area`,
        genre: sql`EXCLUDED.genre`,
        type: sql`EXCLUDED.type`,
        detail: sql`EXCLUDED.detail`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,   // 実カラム名は snake_case
        address: sql`EXCLUDED.address`,
        openHours: sql`EXCLUDED.open_hours`, // 実カラム名は snake_case
      },
    });

  console.log("[upload] 完了 ✅");
  process.exit(0);
}

main().catch((e: unknown) => {
  const err = toError(e);
  console.error("[upload] 失敗 ❌", err.message);
  process.exit(1);
});


// import "dotenv/config";
// import db from "../db/drizzle";
// import { spots } from "../db/spotSchema";
// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";
// import { sql } from "drizzle-orm"; 

// // CSVの1行をそのまま表す型
// type CsvRow = {
//   id?: string;
//   name: string;
//   area: string;
//   genre: string;
//   type: string;
//   detail: string;
//   description: string;
//   image_url: string;
//   address: string;
//   open_hours: string;
// };

// const csvFilePath = path.join(__dirname, "../../../public/data/spots.csv");

// function toArray(value: string): string[] {
//   if (!value) return [];
//   const trimmed = value.trim();
//   if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
//     try {
//       const arr = JSON.parse(trimmed);
//       if (Array.isArray(arr)) return arr.map(String);
//     } catch (e) {
//       console.warn("JSON.parseに失敗しました。値:", e);
//     }
//   }
//   return trimmed.split(",").map(s => s.trim()).filter(Boolean);
// }

// async function importCsvData() {
//   try {
//     const fileContent = fs.readFileSync(csvFilePath, "utf-8");
//     const rows: CsvRow[] = parse(fileContent, {
//       columns: true,
//       skip_empty_lines: true,
//       bom: true,
//       trim: true,
//     });

//     if (!rows.length) {
//       console.log("CSVにレコードがありません。終了します。");
//       process.exit(0);
//     }

//     const records = rows.map((r) => ({
//       name: r.name,
//       area: toArray(r.area),
//       genre: toArray(r.genre),
//       type: r.type,
//       detail: toArray(r.detail),
//       description: r.description,
//       imageUrl: r.image_url,
//       address: r.address,
//       openHours: r.open_hours,
//     }));

//     console.log(`挿入または更新する件数: ${records.length}`);
//     await db
//   .insert(spots)
//   .values(records)
//   .onConflictDoUpdate({
//     target: spots.name,            // name をユニークキーにしている前提
//     set: {
//       area: sql`EXCLUDED.area`,    // ← 配列は EXCLUDED.* をそのまま使う
//       genre: sql`EXCLUDED.genre`,
//       type: sql`EXCLUDED.type`,
//       detail: sql`EXCLUDED.detail`,
//       description: sql`EXCLUDED.description`,
//       imageUrl: sql`EXCLUDED.image_url`,
//       address: sql`EXCLUDED.address`,
//       openHours: sql`EXCLUDED.open_hours`,
//     },
//       });
    
//     console.log("挿入・更新完了 ✅");
//     process.exit(0);
//   } catch (e) {
//     console.error("挿入時エラー ❌", e?.message || e);
//     if (e?.cause) console.error("cause:", e.cause);
//     process.exit(1);
//   }
// }

// importCsvData();