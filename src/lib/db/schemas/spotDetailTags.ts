import { pgTable, integer, timestamp, primaryKey, index } from "drizzle-orm/pg-core";
import { spots } from "./spots";
import { detailTags } from "./detailTags";

export const spotDetailTags = pgTable("spot_detail_tags", {
  spotId: integer("spot_id").notNull().references(() => spots.id),
  tagId: integer("tag_id").notNull().references(() => detailTags.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.spotId, t.tagId] }),
  index("idx_spot_detail_tags_tag").on(t.tagId),
]);

