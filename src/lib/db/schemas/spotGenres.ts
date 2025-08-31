import { pgTable, integer, timestamp, primaryKey, index } from "drizzle-orm/pg-core";
import { spots } from "./spots";
import { genres } from "./genres";

// 中間テーブル
export const spotGenres = pgTable("spot_genres", {
  spotId: integer("spot_id").notNull().references(() => spots.id),
  genreId: integer("genre_id").notNull().references(() => genres.id),
  createdAt: timestamp("created_at", { withTimezone: true }),
}, (t) => ({
  pk: primaryKey({ columns: [t.spotId, t.genreId] }),
  idxGenre: index("idx_spot_genres_genre").on(t.genreId),
}));
