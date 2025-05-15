'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AreaSelect from "./AreaSelect";
import GenreFilter from "./GenreFilter";
import PlaceType from "./PlaceType";
import SearchButton from "../ui/SearchButton";
import SearchResults from "../results/SearchResults";
import type { Spot } from '../../pages/api/spot';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [area, setArea] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');
  const [results, setResults] = useState<Spot[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const genres = ['カフェ', '公園', '美術館', '水族館', '夜景'];

  // ✅ URLのクエリから状態と検索を復元
  useEffect(() => {
    if (!searchParams) return;

    const areaParam = searchParams.get('area') ?? '';
    const typeParam = (searchParams.get('type') ?? '') as 'indoor' | 'outdoor' | '';
    const genreParams = searchParams.getAll('genre') ?? [];

    // 状態だけ更新
    setArea(areaParam);
    setPlaceType(typeParam);
    setGenre(genreParams);

    // クエリから直接検索（状態には頼らない）
    if (areaParam || typeParam || genreParams.length > 0) {
      const params = new URLSearchParams();
      if (areaParam) params.append('area', areaParam);
      if (typeParam) params.append('type', typeParam);
      genreParams.forEach((g) => params.append('genre', g));

      fetch(`/api/spot?${params.toString()}`)
        .then((res) => res.json())
        .then((data: Spot[]) => {
          setResults(data);
          setHasSearched(true);
        });
    }
  }, [searchParams]);

  // ✅ 通常の検索（状態からURLにクエリを反映）
  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (area) params.append('area', area);
    if (placeType) params.append('type', placeType);
    genre.forEach((g) => params.append('genre', g));

    router.push(`?${params.toString()}`);

    const res = await fetch(`/api/spot?${params.toString()}`);
    const data: Spot[] = await res.json();
    setResults(data);
    setHasSearched(true);
  };

  const toggleGenre = (g: string) => {
    setGenre((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="space-y-6 max-w-xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold">スポット検索</h1>

      <AreaSelect area={area} onChange={setArea} />
      <GenreFilter genres={genres} selectedGenres={genre} onToggle={toggleGenre} />
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
          router.push('/');
        }}
        className="ml-4 text-sm text-gray-500 underline hover:text-gray-700"
      >
        条件をリセット
      </button>

      {hasSearched && (
        <>
          <p className="text-sm text-gray-600">
            {results.length > 0
              ? `${results.length}件見つかりました`
              : '該当するスポットはありません'}
          </p>
          <SearchResults results={results} />
        </>
      )}
    </form>
  );
}
