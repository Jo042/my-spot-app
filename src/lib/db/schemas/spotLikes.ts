import { pgTable, integer, primaryKey, index } from "drizzle-orm/pg-core";
import { users } from "./users";
import { spots } from "./spots";

// 中間テーブル
export const spotLikes = pgTable("spot_likes", {
  userId: integer("user_id").notNull().references(() => users.id),
  spotId: integer("spot_id").notNull().references(() => spots.id),
}, (t) => [
  primaryKey({ columns: [t.userId, t.spotId] }),
  index("idx_spot_likes_spot").on(t.spotId),
]);
