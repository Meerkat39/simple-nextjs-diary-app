"use client";

import DiaryForm from "@/components/DiaryForm";
import DiaryList from "@/components/DiaryList";
import { useEffect, useState } from "react";

export default function Home() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch("/api/diaries");
        if (!res.ok) {
          throw new Error("日記の取得に失敗しました。");
        }
        const data = await res.json();
        setDiaries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaries();
  }, []);

  // 3. 表示処理: diaries stateのデータを画面にレンダリング
  return (
    <>
      <DiaryForm />
      <DiaryList diaries={diaries} />
    </>
  );
}
