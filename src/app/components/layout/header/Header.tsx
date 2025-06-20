// src/components/layout/Header.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>読み込み中...</p>

  return (
    <header className="p-4 bg-gray-100 text-sm flex justify-between items-center">
      {session ? (
        <>
          <p>{session.user?.email} でログイン中</p>
          <button onClick={() => signOut()} className="ml-4">ログアウト</button>
        </>
      ) : (
        <button onClick={() => signIn()}>ログイン</button>
      )}
    </header>
  )
}
