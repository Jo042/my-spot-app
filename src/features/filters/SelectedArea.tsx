'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase/supabase';

export default function SelectedArea({
  area,
  selectedAreas,
  onChange,
  onOpenModal,
}: {
  area: string[];
  selectedAreas: string[];
  onChange: (val: string[]) => void;
  onOpenModal: () => void;
}) {
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAreas() {
      const { data, error } = await supabase
        .from('spots')
        .select('area');

      if (error) {
        console.error('エリアの取得に失敗しました:', error);
        return;
      }

      const uniqueAreas = Array.from(new Set(data.map((d) => d.area)));
      setAreas(uniqueAreas);
    }

    fetchAreas();
  }, []);

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
        title={selectedAreas.join(', ')} // hover時にすべて表示
      >
        {displayAreas}
      </span>
    </button>
  );
}
