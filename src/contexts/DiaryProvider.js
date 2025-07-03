"use client";

import { useReducer } from "react";

const { DiaryContext, DiaryDispatchContext } = require("./DiaryContext");

const diaryReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIARIES": {
      return action.payload.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    case "ADD_DIARY": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

const DiaryProvider = ({ children }) => {
  const [diaries, diaryDispatch] = useReducer(diaryReducer, []);

  return (
    <DiaryContext.Provider value={diaries}>
      <DiaryDispatchContext.Provider value={diaryDispatch}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;
