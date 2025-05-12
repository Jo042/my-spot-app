import { notFound } from "next/navigation";
import { spots } from '../../../lib/spots';
import Link from "next/link";

type Props　= {
    params: {id: string};
};

export default function SpotDetailPage({ params }: Props) {
    const spot = spots.find((s) => s.id === params.id);

    if(!spot) return notFound();

    return(
        <main className="max-w-x1 mx-auto p-6 space-y-4">
            <Link href="/" className="text-blue-600 underline text-sm">← 一覧に戻る</Link>
            <h1 className="text-2x1 font-bold">{spot.name}</h1>
            <img
                src={spot.imageUrl}
                alt={spot.name}
                className="w-full h-64 object-cover rounded"
            />

            <p className="text-gray-700">{spot.description}</p>
            <p className="text-sm text-gray-500">住所: {spot.address}</p>
            <p className="text-sm text-gray-500">営業時間: {spot.openHours}</p>
            <p className="text-sm text-gray-500">
            ジャンル: {spot.genres.join(', ')} ／ タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}
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
    )
}