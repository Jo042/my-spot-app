'use client'

import { resourceLimits } from 'worker_threads';
import { Spot } from '../../lib/spots';
import Image from 'next/image';

type Props = {
    results: Spot[];
};

export default function SerachResluts({ results }: Props) {
    return (
        <ul className='mt-6 grid gap-6 md:grid-cols-2'>
            {results.map((spot) => (
                <li key={spot.id} className='bg-white border rounded shadow over-flow-hidden'>
                    <Image
                      src={spot.imageUrl}
                      alt={spot.name}
                      width={500}
                      height={300}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4 space-y-1'>
                        <h2 className='font-bold text-lg text-black'>{spot.name}</h2>
                        <p className='test-sm text-gray-600'>
                            ジャンル: {spot.genres.join(', ')}
                        </p>
                        <p className="text-sm text-gray-700">
                            タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}
                        </p>
                    </div>     
                </li>
            ))}
        </ul>
    );
}