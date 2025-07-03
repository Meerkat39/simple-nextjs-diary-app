import { useContext } from "react";
import { DiaryContext, DiaryDispatchContext } from "./DiaryContext";

export const useDiaries = () => useContext(DiaryContext);
export const useDispatchDiary = () => useContext(DiaryDispatchContext);
