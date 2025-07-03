import { useDiaries } from "@/contexts/useDiaryHook";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  const diaries = useDiaries();
  return (
    <div>
      {diaries.map((diary) => {
        return <DiaryItem key={diary.id} diary={diary} />;
      })}
    </div>
  );
};

export default DiaryList;
