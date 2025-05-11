'use client'

type PlaceType = 'indoor' | 'outdoor' | '';

type Props = {
    value: PlaceType;
    onChange: (value: PlaceType) => void;
};

export default function PlaceType({ value, onChange }: Props){
    return(
        <div>
        <label className="block font-semibold mb-1">タイプ</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`border rounded px-3 py-1 ${
              value === 'indoor' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => 
              onChange(value === 'indoor' ? '' : 'indoor')
            }
          >
            室内
          </button>
          <button
            type="button"
            className={`border rounded px-3 py-1 ${
              value === 'outdoor' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => 
              onChange(value === 'outdoor' ? '' : 'outdoor')
            }
          >
            屋外
          </button>
        </div>
      </div>
    )
}