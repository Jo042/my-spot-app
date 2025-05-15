'use client'

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BackToLink() {
    const searchParams = useSearchParams();
    const query = searchParams?.toString() ?? '';

    return (
        <Link
          href={`/?${query}`}
          className="text-blue-600 underline text-sm"
        >
          ← 一覧に戻る
        </Link>
      );
}