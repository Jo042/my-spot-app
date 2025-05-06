'use client'

import { useState } from "react";
import AreaSelect from "./AreaSelect";
import GenreFilter from "./GenreFilter";
import PlaceType from "./PlaceType";
import SerachButton from "../ui/SearchButton";

export default function SerachForm() {
    const [area, setArea] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');

    const genres = ['カフェ', '公園', '美術館', '水族館'];

    const toggleGenre = (g: string) => {
        setGenre((prev) =>
          prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
        );
      };

    const handleSerach = () => {
        alert(
            `検索条件:\n- 地域: ${area}\n- ジャンル: ${genre.join(', ')}\n- タイプ: ${placeType}`
          );
    }

    return(
        <form className="space-y-6 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">デートスポット検索</h1>
      <AreaSelect area={area} onChange={setArea} />
      <GenreFilter
        genres={genres}
        selectedGenres={genre}
        onToggle={toggleGenre}
      />
      <PlaceType value={placeType} onChange={setPlaceType} />
      <SerachButton onClick={handleSerach} />
    </form>
    )
}