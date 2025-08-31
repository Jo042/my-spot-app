import { pgTable, serial, integer, smallint, text, timestamp, index } from "drizzle-orm/pg-core";
import { spots } from "./spots";
import { users } from "./users";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  userId: integer("user_id").notNull().references(() => users.id),
  rating: smallint("rating").notNull(), // 1-5
  body: text("body"),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (t) => [
  index("idx_reviews_spot").on(t.spotId),
  index("idx_reviews_user").on(t.userId),
]);
