import { pgTable, integer, timestamp, primaryKey, index } from "drizzle-orm/pg-core";
import { spots } from "./spots";
import { genreTags } from "./genreTags";

// 中間テーブル
export const spotGenreTags = pgTable("spot_genre_tags", {
  spotId: integer("spot_id").notNull().references(() => spots.id),
  tagId: integer("tag_id").notNull().references(() => genreTags.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.spotId, t.tagId] }),
  index("idx_spot_genre_tags_tag").on(t.tagId),
]);
