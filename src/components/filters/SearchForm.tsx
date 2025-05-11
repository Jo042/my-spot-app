'use client'

import { useState } from "react";
import AreaSelect from "./AreaSelect";
import GenreFilter from "./GenreFilter";
import PlaceType from "./PlaceType";
import SearchButton from "../ui/SearchButton";
import SearchResults from "../results/SearchResults";
import { spots, Spot} from '../../lib/spots';

export default function SearchForm() {
    const [area, setArea] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');
    const [results, setResults] = useState<Spot[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const genres = ['カフェ', '公園', '美術館', '水族館'];

    const toggleGenre = (g: string) => {
        setGenre((prev) =>
          prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
        );
      };

    const handleSearch = () => {
        const filtered = spots.filter((spot) => {
          const matchesArea = area === '' || spot.area === area;
          const matchesGenre = genre.length === 0 || genre.some((g) => spot.genres.includes(g));
          const matchesType = placeType === '' || spot.type === placeType;
          return matchesArea && matchesGenre && matchesType;
        });

        setResults(filtered);
        setHasSearched(true);
    }

    return(
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="space-y-6 max-w-xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold">スポット検索</h1>
      <AreaSelect area={area} onChange={setArea} />
      <GenreFilter
        genres={genres}
        selectedGenres={genre}
        onToggle={toggleGenre}
      />
      <PlaceType value={placeType} onChange={setPlaceType} />
      <SearchButton onClick={handleSearch} />
      <button
        type="button"
        onClick={() => {
          setArea('');
          setGenre([]);
          setPlaceType('');
          setResults([]);
          setHasSearched(false);
        }}
        className="ml-4 text-sm text-gray-500 underline hover:text-gray-700"
      >
        条件をリセット
      </button>
      {hasSearched && 
        (
          <>
            <p className="text-sm text-gray-600">
              {results.length > 0
               ? `${results.length}件見つかりました`
               : '該当するスポットはありません'}
            </p>
            <SearchResults results={results} />
         </>
        )
      }
    </form>
    )
}