import {pgTable, serial, text, timestamp,varchar, boolean} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password"),
    name: varchar("name", { length: 255 }).notNull(),
    iconUrl: text("icon_url").default("http~~"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    twoFactorSecret: text("2fa_secret"),
    twoFactorActivated: boolean("2fa_activated").default(false)
})

// 型エイリアス
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;