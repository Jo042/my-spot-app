import { pgTable, serial, integer, smallint, varchar, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";

export const areas = pgTable("areas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull(),
  parentId: integer("parent_id"), // self-reference
  level: smallint("level").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => [
    index("parent_idx").on(t.parentId),
    index("level_idx").on(t.level),
    uniqueIndex("unique_parent_slug").on(t.parentId, t.slug),
]);
