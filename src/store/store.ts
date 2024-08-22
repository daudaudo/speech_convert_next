import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AuthReducer from "~/store/slices/auth";
import HistoryReducer from "~/store/slices/history";
import VoiceReducer from "~/store/slices/voice";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		voice: VoiceReducer,
		history: HistoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
