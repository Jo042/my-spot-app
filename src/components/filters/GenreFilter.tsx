'use client'

type Props = {
  genres: { label: string; items: string[] }[];
  selectedGenres: string[];
  onToggle: (genre: string) => void;
  onOpenModal: () => void;
};

export default function GenreFilter({
  genres,
  onOpenModal,
  selectedGenres,
  onToggle,
}: Props) {
  // 3件まで表示、それ以上は「他◯件」
  const displayGenres =
    selectedGenres.length > 3
      ? `${selectedGenres.slice(0, 3).join(', ')} 他${selectedGenres.length - 3}件`
      : selectedGenres.join(', ') || '未選択';

  return (
    <div className="flex justify-between gap-2">
      <button
        type="button"
        onClick={onOpenModal}
        className="flex-1 border border-gray-300 rounded-md py-3 px-4 text-left flex items-center justify-between"
      >
        <span className="text-gray-400">ジャンル</span>
        <span className="text-sm text-gray-800 truncate whitespace-nowrap overflow-hidden max-w-[60%]">
          {displayGenres}
        </span>
      </button>
    </div>
  );
}
