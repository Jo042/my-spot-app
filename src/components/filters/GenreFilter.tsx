'use client'

type Props = {
    genres: string[];
    selectedGenres: string[];
    onToggle: (genre: string) => void;
    onOpenModal: () => void;
};

export default function GenreFilter({ genres, onOpenModal, selectedGenres, onToggle }: Props){
    return (
        <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 border border-gray-300 rounded-md py-3 px-4 text-left flex items-center justify-between"
        >
          <span className="text-gray-400">ジャンル</span>
          <span className="text-sm text-gray-800" >
            {selectedGenres.length > 0 ? selectedGenres.join(', ') : '未選択'}
          </span>

        </button>
        </div>
    );
} 