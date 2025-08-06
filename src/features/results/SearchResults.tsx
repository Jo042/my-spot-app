'use client';

import { Spot } from '../../app/api/spots/route';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  results: Spot[];
  isLoading: boolean;
};

export default function SearchResults({ results, isLoading }: Props) {
  const searchParams = useSearchParams();
  if (!searchParams) return null;
  
   if (isLoading) {
    return (
      <div className="mt-6 text-center text-gray-500 text-sm animate-pulse">
        検索中です...
      </div>
    );
    }
  return (
    <ul className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
      {results.map((spot) => (
        <li
          key={spot.id}
          className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <Image
            src={spot.image_url}
            alt={spot.name}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="font-bold text-lg text-gray-900">{spot.name}</h2>
            <div className="text-sm text-gray-600">
              <p>ジャンル: {spot.genre.join(', ')}</p>
              <p>タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}</p>
            </div>
            <Link
              href={`/spot/${spot.id}?${searchParams.toString()}`}
              className="inline-block mt-2 px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary_hovered"
            >
              詳細を見る
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
