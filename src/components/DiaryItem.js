// src/components/DiaryItem.js

import { useDispatchDiary } from "@/contexts/useDiaryHook";
import { useReducer, useState } from "react";
import ContentInput from "./ContentInput";
import InputTag from "./InputTag";
import MoodInput from "./MoodInput";
import TagList from "./TagList";
import TitleInput from "./TitleInput";

const initialTagState = {
  tags: [],
  currentTag: "",
};

const tagStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_TAG":
      return { ...state, currentTag: action.payload };
    case "ADD_TAG":
      if (state.currentTag && !state.tags.includes(state.currentTag)) {
        return {
          ...state,
          tags: [...state.tags, state.currentTag],
          currentTag: "",
        };
      }
      return state;
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case "RESET_TAGS":
      return initialTagState;
    default:
      return state;
  }
};

const DiaryEditForm = ({ diary, onSave, onCancel }) => {
  const dispathDiary = useDispatchDiary();
  const [title, setTitle] = useState(diary.title);
  const [content, setContent] = useState(diary.content);
  const [mood, setMood] = useState(diary.mood);
  const [tagState, dispatchTags] = useReducer(tagStateReducer, {
    tags: diary.tags || [],
    currentTag: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDiary = {
      ...diary,
      title,
      content,
      mood,
      tags: tagState.tags,
    };

    try {
      const res = await fetch(`/api/diaries/${updatedDiary.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDiary),
      });

      if (res.ok) {
        const updatedDiaryFromSever = await res.json();
        dispathDiary({ type: "UPDATE_DIARY", payload: updatedDiaryFromSever });
        onSave();
      } else {
        console.error("日記の更新に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー: ", error);
    }
  };

  return (
    <div className="p-6 my-4 bg-white border border-blue-300 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">日記を編集</h2>
      <form onSubmit={handleSubmit}>
        <TitleInput title={title} onChange={(e) => setTitle(e.target.value)} />
        <ContentInput
          content={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <MoodInput mood={mood} onChange={(e) => setMood(e.target.value)} />
        <div>
          <InputTag
            currentTag={tagState.currentTag}
            dispatchTags={dispatchTags}
          />
          <TagList tags={tagState.tags} dispatchTags={dispatchTags} />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-grow px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      transition-colors duration-200"
          >
            更新
          </button>
          <button
            type="button" // type="button" にしないとフォーム送信されてしまう
            onClick={onCancel}
            className="flex-grow px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-gray-500 transition-colors duration-200"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

const DiaryItem = ({ diary }) => {
  const dispatchDiary = useDispatchDiary();
  const [isEditing, setIsEditing] = useState(false);

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

  if (isEditing) {
    return (
      <DiaryEditForm
        diary={diary}
        onSave={() => {
          console.log("更新処理を実行します");
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="relative p-4 my-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-blue-600 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
          aria-label="編集"
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
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
      </div>

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
