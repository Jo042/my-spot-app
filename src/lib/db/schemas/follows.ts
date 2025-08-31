import { pgTable, integer, timestamp, primaryKey, index } from "drizzle-orm/pg-core";
import { users } from "./users";

export const follows = pgTable("follows", {
  followerId: integer("follower_id").notNull().references(() => users.id),
  followeeId: integer("followee_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.followerId, t.followeeId] }),
  index("idx_follows_followee").on(t.followeeId),
]);
