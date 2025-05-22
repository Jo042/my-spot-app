'use client';

type PlaceType = 'indoor' | 'outdoor';

type Props = {
  placeType: string[]; // 複数選択対応
  onChange: (value: string[]) => void;
};

export default function PlaceType({ placeType, onChange }: Props) {
  const toggleType = (type: string) => {
    if (placeType.includes(type)) {
      onChange(placeType.filter((t) => t !== type)); // 解除
    } else {
      onChange([...placeType, type]); // 追加
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">タイプ</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggleType('indoor')}
          className={`flex-1 px-4 py-2 rounded-full text-sm border 
            ${placeType.includes('indoor') 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        >
          室内
        </button>
        <button
          type="button"
          onClick={() => toggleType('outdoor')}
          className={`flex-1 px-4 py-2 rounded-full text-sm border 
            ${placeType.includes('outdoor') 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        >
          屋外
        </button>
      </div>
    </div>
  );
}
