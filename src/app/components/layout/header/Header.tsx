// src/components/layout/Header.tsx
'use client' // このコンポーネントはクライアントサイドで動作します

import { useSession, signIn, signOut } from 'next-auth/react' // NextAuthのクライアントサイドフックをインポート
import Link from 'next/link'; // Next.jsのLinkコンポーネントをインポート
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート
import LogoutButton from '@/src/features/header/LogoutButton';
// ヘッダーコンポーネント
export default function Header() {
  // useSessionフックでセッションデータと認証ステータスを取得
  const { data: session, status } = useSession();

  return (
    <header className="p-3 bg-white text-sm flex items-center shadow-sm">
      {/* アプリケーションのロゴとタイトル */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/favicon.ico" alt="ぷらスポロゴ" width={32} height={32} />
        <span className="text-lg font-bold text-gray-800">ぷらスポ</span>
      </Link>

      {/* コンテンツを右端に寄せるためのスペーサー */}
      <div className="flex-grow" />
      
      {/* 認証ステータスに応じた表示の切り替え */}
      {status === 'loading' ? (
        // セッション読み込み中の場合
        <p className="text-sm text-gray-500">読み込み中...</p>
      ) : session ? (
        // ユーザーがログインしている場合
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-600">
            {session.user?.email} でログイン中
          </p>
          <LogoutButton />
        </div>
      ) : (
        // ユーザーがログインしていない場合
        <div className="flex items-center space-x-3">
          {/* 会員登録ボタン */}
          <Link href="/auth/register" passHref>
            <button
              className="text-sm px-4 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-200"
            >
              新規登録
            </button>
          </Link>
          {/* ログインボタン */}
          <Link href="/auth/login" passHref>
          <button
            //onClick={() => signIn()} // ログインボタンのクリックハンドラ
            className="text-sm px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            ログイン
          </button>
          </Link>
        </div>
      )}
    </header>
  );
}
