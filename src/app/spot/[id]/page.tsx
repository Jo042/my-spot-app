export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase";
import BackToLink from "@/src/features/detail/BackToLink";

type Props = {
    params: {id: string};
};

export default async function SpotDetailPage({ params }: Props) {
    const { data: spot, error } = await supabase
    .from("spots")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !spot) return notFound();

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <BackToLink />

      <h1 className="text-2xl font-bold">{spot.name}</h1>

      <img
        src={spot.image_url}
        alt={spot.name}
        className="w-full h-64 object-cover rounded"
      />

      <p className="text-gray-700">{spot.description}</p>
      <p className="text-sm text-gray-500">住所: {spot.address}</p>
      <p className="text-sm text-gray-500">営業時間: {spot.open_hours}</p>
      <p className="text-sm text-gray-500">
        ジャンル: {spot.genre.join(", ")}　
        タイプ: {spot.type === "indoor" ? "室内" : "屋外"}
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          spot.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        地図で見る
      </a>
    </main>
  );
}