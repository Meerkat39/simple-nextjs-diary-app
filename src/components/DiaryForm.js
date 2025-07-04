// src/components/DiaryForm.js

"use client";

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

const DiaryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("normal");
  const [tagState, dispatchTags] = useReducer(tagStateReducer, initialTagState);
  const dispatchDiary = useDispatchDiary();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDiary = {
      date: new Date().toISOString().split("T")[0],
      title,
      content,
      mood,
      tags: tagState.tags,
    };

    try {
      const res = await fetch("/api/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiary),
      });

      if (res.ok) {
        const addedDiary = await res.json();
        dispatchDiary({ type: "ADD_DIARY", payload: addedDiary });
        setTitle("");
        setContent("");
        setMood("normal");
        dispatchTags({ type: "RESET_TAGS" });
      } else {
        console.log("日記の追加に失敗");
      }
    } catch (error) {
      console.error("通信エラー: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
      <TitleInput title={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentInput content={content} onChange={(e) => setContent(e.target.value)} />
      <MoodInput mood={mood} onChange={(e) => setMood(e.target.value)} />
      <div>
        <InputTag currentTag={tagState.currentTag} dispatchTags={dispatchTags} />
        <TagList tags={tagState.tags} dispatchTags={dispatchTags} />
      </div>
      <button 
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
      >
        日記を追加
      </button>
    </form>
  );
};

export default DiaryForm;