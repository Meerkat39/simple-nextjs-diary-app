"use client";

import DiaryForm from "@/components/DiaryForm";
import DiaryList from "@/components/DiaryList";
import DiaryProvider from "@/contexts/DiaryProvider";
import { useDispatchDiary } from "@/contexts/useDiaryHook";
import { useEffect } from "react";

function DiaryInitializer() {
  const dispatchDiary = useDispatchDiary();

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch("/api/diaries");
        if (!res.ok) {
          throw new Error("日記の取得に失敗しました。");
        }
        const data = await res.json();
        dispatchDiary({ type: "SET_DIARIES", payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaries();
  }, [dispatchDiary]);

  return null;
}

export default function Home() {
  // 3. 表示処理: diaries stateのデータを画面にレンダリング
  return (
    <DiaryProvider>
      <DiaryInitializer />
      <DiaryForm />
      <DiaryList />
    </DiaryProvider>
  );
}
