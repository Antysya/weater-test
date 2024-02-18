import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

type AppState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useAppDispath = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

