import {
    pgTable,
    uuid,
    text
  } from "drizzle-orm/pg-core";
  
  export const spots = pgTable("spots", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique(),
    area: text("area").array(),
    genre: text("genre").array(),
    type: text("type"),
    detail: text("detail").array(),
    description: text("description"),
    imageUrl: text("image_url"),
    address: text("address"),
    openHours: text("open_hours"),
  });
  