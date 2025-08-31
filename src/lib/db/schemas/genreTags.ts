import { pgTable, serial, varchar, integer, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./users";

// ユーザー作成のジャンルタグ
export const genreTags = pgTable("genre_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"), // 'active'|'pending'|'merged'|'blocked'
  usageCount: integer("usage_count").notNull().default(0),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => [
  index("idx_genre_tags_name").on(t.name),
  uniqueIndex("genre_tags_slug_unique").on(t.slug),
]);
