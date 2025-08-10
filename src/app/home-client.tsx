// app/home-client.tsx
"use client";

import { useState, useEffect} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Spot } from "./api/spots/route";
import SearchResults from "@/src/features/results/SearchResults";
import * as Selected from "@/src/features/filters/";
import * as Button from "@/src/features/ui/button";
import * as Modal from "@/src/features/modal/index";
import * as Options from "@/src/features/options";
import HeroSection from "../features/hero/HeroSection";

export default function HomeClient() {
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

  const [isLoading, setIsLoading] = useState(false); // ★ タイポ修正 setIsLoading

  // URLのクエリから状態と検索を復元
  useEffect(() => {
    if (!searchParams) return;

    const areaParam = searchParams.getAll("area");
    const typeParam = searchParams.getAll("type");
    const genreParams = searchParams.getAll("genre");
    const detailParams = searchParams.getAll("detail");

    setArea(areaParam);
    setPlaceType(typeParam);
    setGenre(genreParams);
    setDetail(detailParams);

    // ★ lengthで判定（配列は truthy 判定だと常に true）
    if (
      areaParam.length > 0 ||
      typeParam.length > 0 ||
      detailParams.length > 0 ||
      genreParams.length > 0
    ) {
      const params = new URLSearchParams();
      areaParam.forEach((a) => params.append("area", a));
      typeParam.forEach((t) => params.append("type", t));
      genreParams.forEach((g) => params.append("genre", g));
      detailParams.forEach((d) => params.append("detail", d));

      // ★ 先頭にスラッシュ（相対パス事故防止）
      fetch(`/api/spots?${params.toString()}`)
        .then((res) => res.json())
        .then((data: Spot[]) => {
          setResults(data);
          setHasSearched(true);
        })
        .catch(() => {});
    }
  }, [searchParams]);

  // 通常の検索（状態からURLにクエリを反映）
  const handleSearch = async () => {
    const params = new URLSearchParams();
    area.forEach((a) => params.append("area", a));
    placeType.forEach((t) => params.append("type", t));
    genre.forEach((g) => params.append("genre", g));
    detail.forEach((d) => params.append("detail", d));

    router.push(`?${params.toString()}`);

    setIsLoading(true); // ★ ここも setIsLoading
    const res = await fetch(`/api/spots?${params.toString()}`);
    const data: Spot[] = await res.json();
    setResults(data);
    setHasSearched(true);
    setIsLoading(false);
  };

  const toggleGenre = (g: string) => {
    setGenre((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  };

  return (
    <>
      <HeroSection />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="bg-background_deep p-4 rounded shadow-md space-y-4 max-w-xl mx-auto mt-6"
      >
        <h1 className="text-2xl font-bold">スポット検索</h1>
        <div className="bg-white rounded-xl shadow p-4 space-y-4">
          <Selected.SelectedArea
            selectedAreas={selectedArea}
            area={area}
            onChange={setArea}
            onOpenModal={() => {
              setSelectedArea(area);
              setShowAreaModal(true);
            }}
          />

          {/* ★ SelectedGenre に渡す options を genreOptions に修正 */}
          <Selected.SelectedGenre
            genres={Options.genreOptions}
            selectedGenres={genre}
            onToggle={toggleGenre}
            onOpenModal={() => {
              setShowGenreModal(true);
              setSelectedGenres(genre);
            }}
          />

          <Selected.SelectedPlaceType placeType={placeType} onChange={setPlaceType} />

          <div className="flex py-3 justify-between items-center gap-2">
            <Button.DetailButton
              detail={detail}
              selectedDetail={selectedDetail}
              onOpenModal={() => setShowDetailModal(true)}
            />
            <Button.ResetButton
              setArea={() => setArea([])}
              setGenre={() => setGenre([])}
              setPlaceType={() => setPlaceType([])}
              setResults={() => setResults([])}
              setHasSearched={() => setHasSearched(false)}
              setSelectedGenres={() => setSelectedGenres([])}
              setSelectedArea={() => setSelectedArea([])}
            />
          </div>

          <Button.SearchButton onClick={handleSearch} />
        </div>

        {hasSearched && (
          <>
            <p className="text-sm text-gray-600">
              {results.length > 0 ? `${results.length}件見つかりました` : "該当するスポットはありません"}
            </p>
            <SearchResults results={results} isLoading={isLoading} />
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
