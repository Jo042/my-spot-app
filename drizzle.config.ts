import "dotenv/config";
import * as dotenv from 'dotenv';
import {defineConfig} from 'drizzle-kit';

dotenv.config({
    path: ".env.local",
});

export default defineConfig({
    schema: "./src/lib/db/schemas/index.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEON_DATABASE_URL!,
    },
});