import { pgTable, serial, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const details = pgTable("details", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  kind: varchar("kind", { length: 20 }).notNull().default("flag"), // 'flag'|'enum'|'score' など
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => [
  uniqueIndex("details_name_unique").on(t.name),
  uniqueIndex("details_slug_unique").on(t.slug),
]);
