'use client';

import { useState } from 'react';

type AreaCategory = {
  label: string;
  items: string[];
};

type Props = {
  initial: string[];
  selectedArea: string[];
  setSelectedArea: React.Dispatch<React.SetStateAction<string[]>>;
  options: AreaCategory[];
  onClose: () => void;
  onSave: (selected: string[]) => void;
};

export default function AreaModal({
  initial,
  selectedArea,
  setSelectedArea,
  options,
  onClose,
  onSave,
}: Props) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedArea);

  const toggle = (area: string) => {
    setTempSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSelectAll = (items: string[]) => {
    const allSelected = items.every((item) => tempSelected.includes(item));
    if (allSelected) {
      setTempSelected((prev) => prev.filter((a) => !items.includes(a)));
    } else {
      setTempSelected((prev) => [...new Set([...prev, ...items])]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-40 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-xl p-7 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">エリアを選択</h2>

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
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                {category.items.map((area) => (
                  <label key={area} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={tempSelected.includes(area)}
                      onChange={() => toggle(area)}
                      className="form-checkbox text-blue-600"
                    />
                    {area}
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
              setSelectedArea(tempSelected);
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
