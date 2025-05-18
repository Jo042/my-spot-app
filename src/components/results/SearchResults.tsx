'use client'

import { resourceLimits } from 'worker_threads';
import { Spot } from '../../pages/api/spot';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
type Props = {
    results: Spot[];
};

export default function SerachResluts({ results }: Props) {
    const searchParams = useSearchParams(); 
    if (!searchParams) return;
    return (
        <ul className='mt-6 grid gap-6 md:grid-cols-2'>
            {results.map((spot) => (
                <li key={spot.id} className='bg-white border rounded shadow over-flow-hidden'>
                    <Image
                      src={spot.image_url}
                      alt={spot.name}
                      width={500}
                      height={300}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4 space-y-1'>
                        <h2 className='font-bold text-lg text-black'>{spot.name}</h2>
                        <p className='test-sm text-gray-600'>
                            ジャンル: {spot.genre.join(', ')}
                        </p>
                        <p className="text-sm text-gray-700">
                            タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}
                        </p>
                        <Link 
                            className='inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm'
                            href={`/spot/${spot.id}?${searchParams.toString()}`}
                        >
                            詳細を見る
                        </Link>

                    </div>     
                </li>
            ))}
        </ul>
    );
}