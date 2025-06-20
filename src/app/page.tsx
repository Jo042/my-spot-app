'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Spot } from '../pages/api/spot';
import SearchResults from "@/src/features/results/SearchResults";
import * as Selected from "@/src/features/filters/"
import * as Button from "@/src/features/ui/button"
import * as Modal from "@/src/features/modal/index"
import * as Options from "@/src/features/options"

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [area, setArea] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<string[]>([]);
  const [detail, setDetail] = useState<string[]>([]);

  const [results, setResults] = useState<Spot[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
 
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genre);
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<string[]>([]);

  const [isLoading, setIsLoding] = useState(false);
  

  //const detailOptions = ['こだわり'];
  // URLのクエリから状態と検索を復元
  useEffect(() => {
    if (!searchParams) return;

    const areaParam = searchParams.getAll('area') ?? [];
    const typeParam = searchParams.getAll('type') ?? [];
    const genreParams = searchParams.getAll('genre') ?? [];
    const detailParamas = searchParams.getAll('detail') ?? [];
    // 状態だけ更新
    setArea(areaParam);
    setPlaceType(typeParam);
    setGenre(genreParams);
    setDetail(detailParamas);

    // クエリから直接検索（状態には頼らない）
    if (areaParam || typeParam || detailParamas|| genreParams.length > 0) {
      const params = new URLSearchParams();
      areaParam.forEach((a) => params.append('area', a));
      typeParam.forEach((t) => params.append('type', t));
      genreParams.forEach((g) => params.append('genre', g));
      detailParamas.forEach((d) => params.append('detail', d));

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
    area.forEach((a) => params.append('area', a));
    placeType.forEach((t) => params.append('type' , t));
    genre.forEach((g) => params.append('genre', g));
    detail.forEach((d) => params.append('detail', d));

    router.push(`?${params.toString()}`);

    setIsLoding(true);
    const res = await fetch(`/api/spot?${params.toString()}`);
    const data: Spot[] = await res.json();
    setResults(data);
    setHasSearched(true);
    setIsLoding(false);
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
        <Selected.SelectedArea
          selectedAreas={selectedArea} 
          area={area} 
          onChange={setArea}
          onOpenModal={() => {
            setSelectedArea(area);
            setShowAreaModal(true)}}
        />
        <Selected.SelectedGenre 
          genres={Options.areaOptions} 
          selectedGenres={genre} 
          onToggle={toggleGenre} 
          onOpenModal={() => {
            setShowGenreModal(true)
            setSelectedGenres(genre);
          }}
        />
        <Selected.SelectedPlaceType 
          placeType={placeType} 
          onChange={setPlaceType}
        />
        <div className="flex py-3 justify-between items-center gap-2">
          <Button.DetailButton 
            detail = {detail}
            selectedDetail={selectedDetail}
            onOpenModal={() => setShowDetailModal(true)}
            //onToggle={}
          />
          <Button.ResetButton 
            setArea = {() => setArea([])}
            setGenre={() => setGenre([])}
            setPlaceType ={() =>setPlaceType([])}
            setResults={() =>setResults([])}
            setHasSearched={() => setHasSearched(false)}
            setSelectedGenres={() => setSelectedGenres([])}
            setSelectedArea={() => setSelectedArea([])}
          />
        </div>
        <Button.SearchButton 
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
          <SearchResults 
            results={results} 
            isLoading={isLoading}
          />
        </>
      )}
    </form>
    {showAreaModal && (
      <Modal.AreaModal
        initial={area}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        options={Options.areaOptions}
        onClose={() => setShowAreaModal(false)}
        onSave={(newSelected) => setArea(newSelected)}
      />
    )}
    {showGenreModal && (
      <Modal.GenreModal
        initial={genre}
        selectedGenre={selectedGenres}
        setSelectedGenre={setSelectedGenres}
        options={Options.genreOptions}
        onClose={() => setShowGenreModal(false)}
        onSave={(newSelected) => setGenre(newSelected)}
    />
    )}

    {showDetailModal && (
      <Modal.DetailModal
        initial={detail}
        selectedDetail={selectedDetail}
        setSelectedDetail={setSelectedDetail}
        options={Options.detailOptions}
        onClose={() => setShowDetailModal(false)}
        onSave={(newSelected) => setDetail(newSelected)}
      />
    )}
    </>
  );
}
