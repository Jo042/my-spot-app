'use client'

import { resourceLimits } from 'worker_threads';
import { Spot } from '../../lib/spots';

type Props = {
    results: Spot[];
};

export default function SerachResluts({ results }: Props) {
    if(results.length === 0) {
        return <p className='text-gray-600 mt-4'>該当するスポットはありません</p>
    }

    return (
        <ul className='mt-4 space-y-4'>
            {results.map((spot) => (
                <li key={spot.id} className='border rounded p-4 shadow'>
                    <h2 className='font-bold text-lg'>{spot.name}</h2>
                    <p className='test-sm text-gray-700'>ジャンル: {spot.genres.join(', ')}</p>
                    <p className="text-sm text-gray-700">タイプ: {spot.type === 'indoor' ? '室内' : '屋外'}</p>
                </li>
            ))}
        </ul>
    );
}