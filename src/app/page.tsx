"use client"

import { useState } from "react";
import SerachForm from "../components/filters/SerachForm";

export default function HomePage() {
  const [area, setArea] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<'indoor' | 'outdoor' | ''>('');

  const genres = ['カフェ', '公園', '美術館', '水族館'];

  return (
    <main>
      <SerachForm />
    </main>
  );
}
