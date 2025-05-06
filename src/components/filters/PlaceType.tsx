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
          <label>
            <input
              type="radio"
              name="placeType"
              value="indoor"
              checked={value === 'indoor'}
              onChange={() => onChange('indoor')}
            />
            室内  
          </label>
          <label>
            <input
              type="radio"
              name="placeType"
              value="outdoor"
              checked={value === 'outdoor'}
              onChange={() => onChange('outdoor')}
            />
            屋外  
          </label>
        </div>
      </div>
    )
}