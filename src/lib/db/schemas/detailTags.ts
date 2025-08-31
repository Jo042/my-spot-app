import { pgTable, serial, varchar, integer, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./users";

// ユーザー作成の詳細条件
export const detailTags = pgTable("detail_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  usageCount: integer("usage_count").notNull().default(0),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => ({
  nameIdx: index("idx_detail_tags_name").on(t.name),
  slugUq: uniqueIndex("detail_tags_slug_unique").on(t.slug),
}));
