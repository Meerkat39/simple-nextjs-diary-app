"use client";

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
    default:
      return state;
  }
};

const DiaryForm = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("normal");
  const [tagState, dispatchTags] = useReducer(tagStateReducer, initialTagState);

  return (
    <form>
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
      <button type="submit">日記を追加</button>
    </form>
  );
};

export default DiaryForm;
