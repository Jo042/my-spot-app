import { pgTable, serial, integer, varchar, text, smallint, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { areas } from "./areas";

export const spots = pgTable("spots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id), // onDelete等は要件に応じて
  name: varchar("name", { length: 255 }).notNull(),
  areaId: integer("area_id").notNull().references(() => areas.id),
  type: integer("type").default(0), // 0:どちらでも 1:屋内 2:屋外
  description: text("description").notNull(),
  address: varchar("address", { length: 255 }),
  openHours: varchar("open_hours", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});
