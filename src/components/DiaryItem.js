// src/components/DiaryItem.js

import { useDispatchDiary } from "@/contexts/useDiaryHook";

const DiaryItem = ({ diary }) => {
  const dispatchDiary = useDispatchDiary();

  const handleDelete = async () => {
    if (!confirm("本当にこの日記を削除しますか？")) return;

    try {
      const res = await fetch(`/api/diaries/${diary.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatchDiary({ type: "DELETE_DIARY", payload: { id: diary.id } });
      }
    } catch (error) {
      console.error("通信エラー: ", error);
    }
  };

  return (
    <div className="relative p-4 my-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
        aria-label="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-xl font-bold mb-2 text-gray-800">{diary.title}</h2>
      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{diary.content}</p>
      <small className="text-sm text-gray-500 block mb-2">
        {new Date(diary.date).toLocaleDateString()}
      </small>
      <p className="text-gray-600 mb-4">気分: {diary.mood}</p>

      <div className="flex flex-wrap gap-2">
        {diary.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiaryItem;
