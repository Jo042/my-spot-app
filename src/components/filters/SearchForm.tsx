'use client'

import { useState } from "react";
import AreaSelect from "./AreaSelect";
import GenreFilter from "./GenreFilter";
import PlaceType from "./PlaceType";
import SearchButton from "../ui/SearchButton";
import SearchResults from "../results/SearchResults";
import type { Spot } from '../../pages/api/spot';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchForm() {
    const searchParams = useSearchParams();
    const initialArea = searchParams?.get('area') ?? '';
    const initialType = (searchParams?.get('type') ?? '') as 'indoor' | 'outdoor' | '';
    const initialGenres = searchParams?.getAll('genre') ?? [];
    const [area, setArea] = useState(initialArea);
    const [genre, setGenre] = useState<string[]>(initialGenres);
    const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>(initialType);
    const [results, setResults] = useState<Spot[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();

    const genres = ['カフェ', '公園', '美術館', '水族館'];

    useEffect(() => {
      if(
        initialArea !== '' ||
        initialType !== '' ||
        (initialGenres && initialGenres.length > 0)
      ){
        handleSearch();
      }
    } , []);

    const toggleGenre = (g: string) => {
        setGenre((prev) =>
          prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
        );
    };

    const handleSearch = async () => {
        const params  = new URLSearchParams();

        if(area) params.append('area', area);
        if(placeType) params.append('type', placeType);
        genre.forEach((g) => params.append('genre', g));

        router.push(`?${params.toString()}`);

        const res = await fetch(`/api/spot?${params.toString()}`);
        const filtered: Spot[] = await res.json();
        console.log("APIレスポンス:", filtered);
        

        setResults(filtered);
        setHasSearched(true);
      };

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