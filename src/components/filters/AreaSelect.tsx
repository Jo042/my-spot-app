'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';

export default function AreaSelect({
  area,
  onChange,
}: {
  area: string;
  onChange: (val: string) => void;
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

  return (
    <select
      value={area}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">選択してください</option>
      {areas.map((area) => (
        <option key={area} value={area}>
          {area}
        </option>
      ))}
    </select>
  );
}
