import { pgTable, serial, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => [
  uniqueIndex("genres_name_unique").on(t.name),
  uniqueIndex("genres_slug_unique").on(t.slug),
]);
