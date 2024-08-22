// src/store/slices/history/historyApiActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import getConversationHistory from "~/actions/data/getConversationHistory";
import getSpeechHistory from "~/actions/data/getSpeechHistory";
import getTextHistory from "~/actions/data/getTextHistory";

export const ACTIONS = {
	FETCH_SPEECH_HISTORY: "history/fetchSpeechHistory",
	FETCH_TEXT_HISTORY: "history/fetchTextHistory",
	FETCH_CONVERSATION_HISTORY: "history/fetchConversationHistory",
};

type HistoryPayload = { limit: string | number; page: string | number };

const fetchConversationHistory = createAsyncThunk(
	ACTIONS.FETCH_CONVERSATION_HISTORY,
	async ({ limit, page }: HistoryPayload, { rejectWithValue }) => {
		try {
			const data = await getConversationHistory(limit, page);
			return data;
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const fetchSpeechHistory = createAsyncThunk(
	ACTIONS.FETCH_SPEECH_HISTORY,
	async ({ limit, page }: HistoryPayload, { rejectWithValue }) => {
		try {
			const data = await getSpeechHistory(limit, page);
			return data;
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const fetchTextHistory = createAsyncThunk(
	ACTIONS.FETCH_TEXT_HISTORY,
	async ({ limit, page }: HistoryPayload, { rejectWithValue }) => {
		try {
			const data = await getTextHistory(limit, page);
			return data;
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const historyApiActions = {
	fetchConversationHistory,
	fetchSpeechHistory,
	fetchTextHistory,
};

export default historyApiActions;
