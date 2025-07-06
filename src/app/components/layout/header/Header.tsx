// src/components/layout/Header.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>読み込み中...</p>

  return (
      <header className="p-3 bg-white text-sm flex justify-end items-center">
          {session ? (
            <>
              <p>{session.user?.email} でログイン中</p>
              <button onClick={() => signOut()} className="ml-4">ログアウト</button>
            </>
          ) : (
            
            <button onClick={() => signIn()} className="w-auto border border-gray-300 rounded-2xl py-1 px-4 bg-blue-600 text-white font-bold">新規登録/ログイン</button>
          )}
      </header>
  )
}
