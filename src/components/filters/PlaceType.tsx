'use client'

type PlaceType = 'indoor' | 'outdoor' | '';

type Props = {
    value: PlaceType;
    onChange: (value: PlaceType) => void;
    onOpenModal: () => void;
};

export default function PlaceType({ value, onChange, onOpenModal }: Props){
    return(
        <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 border border-gray-300 rounded-md py-3 px-4 text-left flex items-center justify-between"
        >
          <span className="text-gray-400">タイプ</span>
          <span className="text-sm text-gray-800">
            {value === 'indoor' ? '室内' : value === 'outdoor' ? '屋外' : '未選択'}
          </span>
        </button>
        </div>
    )
}