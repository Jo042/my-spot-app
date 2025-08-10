'use client';



export default function SelectedArea({
  selectedAreas,
  onOpenModal,
}: {
  area : string[];
  selectedAreas: string[];
  onChange: (val: string[]) => void;
  onOpenModal: () => void;
}) {
  const displayAreas =
    selectedAreas.length > 3
      ? `${selectedAreas.slice(0, 3).join(', ')} 他${selectedAreas.length - 3}件`
      : selectedAreas.join(', ') || '未選択';

  return (
    <button
      type='button'
      onClick={onOpenModal}
      className='w-full border border-gray-300 rounded-md py-3 px-4 text-left flex items-center justify-between'
    >
      <span className='text-gray-400'>エリア</span>
      <span
        className='text-sm text-gray-800 truncate whitespace-nowrap overflow-hidden max-w-[60%]'
        title={selectedAreas.join(', ')}
      >
        {displayAreas}
      </span>
    </button>
  );
}
