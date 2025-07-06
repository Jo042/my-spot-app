// src/components/layout/Header.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';
export default function Header() {
  const { data: session, status } = useSession()

  return (
      <header className="p-3 bg-white text-sm flex  items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/favicon.ico" alt="ぷらスポロゴ" width={32} height={32} />
          <span className="text-lg font-bold text-gray-800">ぷらスポ</span>
        </Link>

        <div className="flex-grow" />
        
        {status === 'loading' ? (
        <p className="text-sm text-gray-500">読み込み中...</p>
      ) : session ? (
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-600">{session.user?.email} でログイン中</p>
          <button
            onClick={() => signOut()}
            className="text-sm px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="text-sm px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          新規登録 / ログイン
        </button>
      )}
      </header>
  )
}
