import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
console.log(process.env.NEON_DATABASE_URL)
const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql);

export default db;