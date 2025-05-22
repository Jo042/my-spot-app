'use client';

import { useState } from 'react';

type Props = {
    initial: string[];
    selectedArea: string[];
    setSelectedArea: React.Dispatch<React.SetStateAction<string[]>>;
    options: string[];
    onClose: () => void;
    onSave: (selected: string[]) => void;
};

export default function AreaModal({selectedArea, setSelectedArea, options, onClose, onSave}: Props){
    

    const toggle = (area: string) => {
        setSelectedArea((prev) => 
            prev.includes(area)
                ? prev.filter((a) => a !== area)
                : [...prev, area]
        );
    };

    return (
        <div className="fixed inset-0 bg-opacity-40 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">エリアを選択</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {options.map((area) => (
                <label key={area} className="block cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedArea.includes(area)}
                    onChange={() => toggle(area)}
                  />
                  {area}
                </label>
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
                  onSave(selectedArea);
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
