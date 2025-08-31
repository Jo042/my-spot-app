import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { spots } from "./spots";

export const spotImages = pgTable("spot_images", {
  id: serial("id").primaryKey(),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  url: varchar("url", { length: 2048 }).notNull(),
});
