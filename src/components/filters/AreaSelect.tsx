'use client'

import React from "react";

type Props = {
    area: string;
    onChange: (value: string) => void;
};

export default function AreaSelect({ area, onChange }: Props) {
    return (
        <div>
        <label className="block font-semibold mb-1">地域を選択</label>
        <select
          className="w-full border rouded p-2  bg-black text-white"
          value={area}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="shinjuku">新宿</option>
          <option value="ikebukuro">池袋</option>
          <option value="yokohama">横浜</option>
          </select>  
      </div>
    );
}