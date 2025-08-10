import "../styles/globals.css";
import Header from "./components/layout/header/Header";
import { AuthProvider } from '@/src/features/AuthProvier'
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'ぷらスポ',
  icons: {
    icon: '/favicon.ico',
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const session = await auth();
  return (
    <html lang="ja">
      <AuthProvider>
      <body>
        
          <Header></Header>
        
        {children}
      </body>
      </AuthProvider>
    </html>
  );
}
