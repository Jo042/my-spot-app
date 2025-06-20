'use client';

import { useState } from 'react';

type Category = {
  label: string;
  items: string[];
};

type Props = {
  initial: string[];
  selectedGenre: string[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<string[]>>;
  options: Category[];
  onClose: () => void;
  onSave: (selected: string[]) => void;
};

export default function GenreModal({
  initial,
  selectedGenre,
  setSelectedGenre,
  options,
  onClose,
  onSave,
}: Props) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedGenre);

  const toggle = (genre: string) => {
    setTempSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSelectAll = (items: string[]) => {
    const allSelected = items.every((item) => tempSelected.includes(item));
    if (allSelected) {
      setTempSelected((prev) => prev.filter((g) => !items.includes(g)));
    } else {
      setTempSelected((prev) => [...new Set([...prev, ...items])]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">ジャンルを選択</h2>

        <div className="space-y-4">
          {options.map((category) => (
            <div key={category.label}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-700">{category.label}</h3>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => handleSelectAll(category.items)}
                >
                  一括選択
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {category.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={tempSelected.includes(item)}
                      onChange={() => toggle(item)}
                      className="form-checkbox text-blue-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            onClick={() => {
              setSelectedGenre(tempSelected);
              onSave(tempSelected);
              onClose();
            }}
          >
            設定する
          </button>
        </div>
      </div>
    </div>
  );
}
