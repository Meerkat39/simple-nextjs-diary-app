import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaries }) => {
  return (
    <div>
      {diaries.map((diary) => {
        return <DiaryItem key={diary.id} diary={diary} />;
      })}
    </div>
  );
};

export default DiaryList;
