import { pgTable, integer, timestamp, primaryKey, index, varchar } from "drizzle-orm/pg-core";
import { spots } from "./spots";
import { details } from "./details";

// 中間テーブル
export const spotDetails = pgTable("spot_details", {
  spotId: integer("spot_id").notNull().references(() => spots.id),
  conditionId: integer("condition_id").notNull().references(() => details.id),
  // enum/score拡張時はvalueを追加（DBMLコメントに準拠）
  // value: varchar("value", { length: 40 }),
  createdAt: timestamp("created_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.spotId, t.conditionId] }),
  index("idx_spot_detail_conditions_condition").on(t.conditionId),
]);
