CREATE TABLE "areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"parent_id" integer,
	"level" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "details" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"kind" varchar(20) DEFAULT 'flag' NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "detail_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" integer NOT NULL,
	"followee_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "follows_follower_id_followee_id_pk" PRIMARY KEY("follower_id","followee_id")
);
--> statement-breakpoint
CREATE TABLE "genre_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"spot_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"rating" smallint NOT NULL,
	"body" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "spot_detail_tags" (
	"spot_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "spot_detail_tags_spot_id_tag_id_pk" PRIMARY KEY("spot_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "spot_details" (
	"spot_id" integer NOT NULL,
	"condition_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "spot_details_spot_id_condition_id_pk" PRIMARY KEY("spot_id","condition_id")
);
--> statement-breakpoint
CREATE TABLE "spot_genre_tags" (
	"spot_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "spot_genre_tags_spot_id_tag_id_pk" PRIMARY KEY("spot_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "spot_genres" (
	"spot_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "spot_genres_spot_id_genre_id_pk" PRIMARY KEY("spot_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "spot_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"spot_id" integer NOT NULL,
	"url" varchar(2048) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spot_likes" (
	"user_id" integer NOT NULL,
	"spot_id" integer NOT NULL,
	CONSTRAINT "spot_likes_user_id_spot_id_pk" PRIMARY KEY("user_id","spot_id")
);
--> statement-breakpoint
CREATE TABLE "spots" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"area_id" integer NOT NULL,
	"type" integer DEFAULT 0,
	"description" text NOT NULL,
	"address" varchar(255),
	"open_hours" varchar(255),
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text,
	"name" varchar(255) NOT NULL,
	"icon_url" text DEFAULT 'http~~',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"2fa_secret" text,
	"2fa_activated" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "detail_tags" ADD CONSTRAINT "detail_tags_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followee_id_users_id_fk" FOREIGN KEY ("followee_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genre_tags" ADD CONSTRAINT "genre_tags_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_detail_tags" ADD CONSTRAINT "spot_detail_tags_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_detail_tags" ADD CONSTRAINT "spot_detail_tags_tag_id_detail_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."detail_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_details" ADD CONSTRAINT "spot_details_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_details" ADD CONSTRAINT "spot_details_condition_id_details_id_fk" FOREIGN KEY ("condition_id") REFERENCES "public"."details"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_genre_tags" ADD CONSTRAINT "spot_genre_tags_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_genre_tags" ADD CONSTRAINT "spot_genre_tags_tag_id_genre_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."genre_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_genres" ADD CONSTRAINT "spot_genres_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_genres" ADD CONSTRAINT "spot_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_images" ADD CONSTRAINT "spot_images_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_likes" ADD CONSTRAINT "spot_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spot_likes" ADD CONSTRAINT "spot_likes_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spots" ADD CONSTRAINT "spots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spots" ADD CONSTRAINT "spots_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "parent_idx" ON "areas" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "level_idx" ON "areas" USING btree ("level");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_parent_slug" ON "areas" USING btree ("parent_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "details_name_unique" ON "details" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "details_slug_unique" ON "details" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_detail_tags_name" ON "detail_tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "detail_tags_slug_unique" ON "detail_tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_follows_followee" ON "follows" USING btree ("followee_id");--> statement-breakpoint
CREATE INDEX "idx_genre_tags_name" ON "genre_tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "genre_tags_slug_unique" ON "genre_tags" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_name_unique" ON "genres" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_slug_unique" ON "genres" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_reviews_spot" ON "reviews" USING btree ("spot_id");--> statement-breakpoint
CREATE INDEX "idx_reviews_user" ON "reviews" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_spot_detail_tags_tag" ON "spot_detail_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_spot_detail_conditions_condition" ON "spot_details" USING btree ("condition_id");--> statement-breakpoint
CREATE INDEX "idx_spot_genre_tags_tag" ON "spot_genre_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_spot_genres_genre" ON "spot_genres" USING btree ("genre_id");--> statement-breakpoint
CREATE INDEX "idx_spot_likes_spot" ON "spot_likes" USING btree ("spot_id");