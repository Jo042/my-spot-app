"use client"

import { useState } from "react";

export default function HomePage() {
  const [area, setArea] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');

  const genres = ['カフェ', '公園', '美術館', '水族館'];

  return (
    <main className="p-6 max-w-x1 mx-auto space-y-6">
      <h1 className="text-2x1 font-bold">スポット検索</h1>
      {/* 地域選択 */}
      <div>
        <label className="block font-semibold mb-1">地域を選択</label>
        <select
          className="w-full border rouded p-2  bg-black text-white"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="shinjuku">新宿</option>
          <option value="ikebukuro">池袋</option>
          <option value="yokohama">横浜</option>
          </select>  
      </div>

      {/* ジャンル選択 */}
      <div>
        <label className="block font-semibold mb-1">ジャンル</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className={`border rounded px-3 py-1 ${
                genre.includes(g) ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() =>
                setGenre((prev) =>
                  prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
                )
              }
            >
              {g}
            </button> 
            ))}
        </div>
      </div>

      {/* 室内/屋外 */}
      <div>
        <label className="block font-semibold mb-1">タイプ</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="placeType"
              value="indoor"
              checked={placeType === 'indoor'}
              onChange={() => setPlaceType('indoor')}
            />
            室内  
          </label>
          <label>
            <input
              type="radio"
              name="placeType"
              value="outdoor"
              checked={placeType === 'outdoor'}
              onChange={() => setPlaceType('outdoor')}
            />
            屋外  
          </label>
        </div>
      </div>

      {/* 検索ボタン */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => alert('まだ検索機能はありません')}
      >
        この条件で探す
      </button>
    </main>
  );
}
