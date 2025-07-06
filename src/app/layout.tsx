import "../styles/globals.css";
import Header from "./components/layout/header/Header";
import { AuthProvider } from '@/src/features/AuthProvier'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <Header></Header>
        </AuthProvider>
        {children}
      </body>
    </html>
  );
}
