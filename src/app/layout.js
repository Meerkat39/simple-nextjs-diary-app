// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "シンプル日記アプリ",
  description: "Next.jsとTailwind CSSで作成したシンプルな日記アプリです。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900">シンプル日記アプリ</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}