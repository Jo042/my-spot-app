import { notFound } from "next/navigation";
import { spots } from '../../../lib/spots';

type Props　= {
    params: {id: string};
};

export default function SpotDetailPage({ params }: Props) {
    const spot = spots.find((s) => s.id === params.id);

    if(!spot) return notFound();

    return(
        <main className="max-w-x1 mx-auto p-6 space-y-4">
            <h1 className="text-2x1 font-bold">{spot.name}</h1>
            <img
                src={spot.imageUrl}
                alt={spot.name}
                className="w-full h-64 object-cover rounded"
            />
            <p>ジャンル: {spot.genres.join(', ')}</p>   
            <p>タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}</p>
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