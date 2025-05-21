'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AreaSelect from "./AreaSelect";
import GenreFilter from "./GenreFilter";
import PlaceType from "./PlaceType";
import SearchButton from "../ui/button/SearchButton";
import SearchResults from "../results/SearchResults";
import type { Spot } from '../../pages/api/spot';
import DetailedButton from "../ui/button/DetailedButton";
import ResetButton from "../ui/button/ResetButton";
import GenreModal from "../modal/GenreModal";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [area, setArea] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');
  const [results, setResults] = useState<Spot[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  
  const [selected, setSelected] = useState<string[]>(genre);

  const genres = ['カフェ', '公園', '美術館', '水族館', '夜景'];

  // URLのクエリから状態と検索を復元
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

  // 通常の検索（状態からURLにクエリを反映）
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
    <>
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-4 text-center rounded-md shadow mb-6">
    <h1 className="text-2xl font-bold text-gray-800">お出かけスポットを探そう</h1>
    <p className="text-gray-600 mt-2">エリア・ジャンル・タイプから今すぐ見つかる</p>
    <a href="#search" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm shadow hover:bg-blue-700">
      条件を選んで検索する
    </a>
    </div>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="bg-white p-4 rounded shadow-md space-y-4 max-w-xl mx-auto mt-6"
    >
      <h1 className="text-2xl font-bold">スポット検索</h1>
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <AreaSelect 
          area={area} 
          onChange={setArea}
          onOpenModal={() => setShowAreaModal(true)}
        />
        <GenreFilter 
          genres={genres} 
          selectedGenres={genre} 
          onToggle={toggleGenre} 
          onOpenModal={() => {
            setShowGenreModal(true)
            setSelected(genre);
          }}
        />
        <PlaceType 
          value={placeType} 
          onChange={setPlaceType} 
          onOpenModal={() => setShowGenreModal} 
        />
        <div className="flex py-3 justify-between items-center gap-2">
          <DetailedButton />
          <ResetButton 
            setArea = {() => setArea('')}
            setGenre={() => setGenre([])}
            setPlaceType ={() =>setPlaceType('')}
            setResults={() =>setResults([])}
            setHasSearched={() => setHasSearched(false)}
            setSelectedGenre={() => setSelected([])}
          />
        </div>
        <SearchButton 
          onClick={handleSearch} 
        />
      </div>
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
    {showGenreModal && (
    <GenreModal
      initial={genre}
      selected={selected}
      setSelectedGenre={setSelected}
      options={genres}
      onClose={() => setShowGenreModal(false)}
      onSave={(newSelected) => setGenre(newSelected)}
    />
)}
    </>
  );
}
