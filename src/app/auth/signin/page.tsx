'use client';
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">ログイン</h1>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="mb-4">
            {provider.id === 'email' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn('email', { email });
                }}
              >
                <input
                  type="email"
                  placeholder="メールアドレスを入力"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border px-3 py-2 rounded w-full mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Magic Link を送信
                </button>
              </form>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={() => signIn(provider.id)}
              >
                {provider.name}でログイン
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
