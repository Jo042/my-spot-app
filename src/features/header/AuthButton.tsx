// src/app/components/layout/header/AuthButtons.tsx
'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

// 親のサーバーコンポーネントからセッション情報を受け取ります
export default function AuthButtons({ session }: { session: Session | null }) {
  // sessionオブジェクトが存在するかどうかで表示を切り替えます
  return session ? (
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
  );
}
