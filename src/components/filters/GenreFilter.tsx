'use client'

type Props = {
    genres: string[];
    selectedGenres: string[];
    onToggle: (genre: string) => void;
};

export default function GenreFilter({ genres, selectedGenres, onToggle }: Props){
    return (
        <div>
        <label className="block font-semibold mb-1">ジャンル</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className={`border rounded px-3 py-1 ${
                selectedGenres.includes(g) ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() =>onToggle(g)}
            >
              {g}
            </button> 
            ))}
        </div>
      </div>
    );
} 