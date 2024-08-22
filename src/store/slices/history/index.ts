import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import historyApiActions from "~/store/slices/history/historyApiActions";
import {
	ConversationHistoryItemResponseData,
	ConversationHistoryResponseData,
	SpeechHistoryItemResponseData,
	SpeechHistoryResponseData,
	TextHistoryItemResponseData,
	TextHistoryResponseData,
} from "~/types/response/history";

type HistoryRecord<DataRecord = any> = {
	items: DataRecord[];
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
	from: number;
	to: number;
	loading: boolean;
	error: string | null;
};

const initHistoryRecord: HistoryRecord = {
	items: [],
	current_page: 0,
	last_page: 0,
	per_page: 0,
	total: 0,
	from: 0,
	to: 0,
	loading: false,
	error: null,
};

interface HistoryState {
	speech: HistoryRecord<SpeechHistoryItemResponseData>;
	transcription: HistoryRecord<TextHistoryItemResponseData>;
	conversation: HistoryRecord<ConversationHistoryItemResponseData>;
}

const initialState: HistoryState = {
	speech: initHistoryRecord,
	transcription: initHistoryRecord,
	conversation: initHistoryRecord,
};

export const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(historyApiActions.fetchConversationHistory.pending, (state) => {
				state.conversation = {
					...(state.conversation || {}),
					loading: true,
					error: null,
				};
			})
			.addCase(
				historyApiActions.fetchConversationHistory.fulfilled,
				(state, action: PayloadAction<ConversationHistoryResponseData>) => {
					state.conversation = {
						...action.payload,
						loading: false,
						error: null,
					};
				},
			)
			.addCase(historyApiActions.fetchConversationHistory.rejected, (state, action) => {
				state.conversation = {
					...(state.conversation || {}),
					loading: false,
					error: action.payload as string,
				};
			})
			.addCase(historyApiActions.fetchSpeechHistory.pending, (state) => {
				state.speech = {
					...(state.speech || {}),
					loading: true,
					error: null,
				};
			})
			.addCase(
				historyApiActions.fetchSpeechHistory.fulfilled,
				(state, action: PayloadAction<SpeechHistoryResponseData>) => {
					state.speech = {
						...action.payload,
						loading: false,
						error: null,
					};
				},
			)
			.addCase(historyApiActions.fetchSpeechHistory.rejected, (state, action) => {
				state.speech = {
					...(state.speech || {}),
					loading: false,
					error: action.payload as string,
				};
			})
			.addCase(historyApiActions.fetchTextHistory.pending, (state) => {
				state.transcription = {
					...(state.transcription || {}),
					loading: true,
					error: null,
				};
			})
			.addCase(
				historyApiActions.fetchTextHistory.fulfilled,
				(state, action: PayloadAction<TextHistoryResponseData>) => {
					state.transcription = {
						...action.payload,
						loading: false,
						error: null,
					};
				},
			)
			.addCase(historyApiActions.fetchTextHistory.rejected, (state, action) => {
				state.transcription = {
					...(state.transcription || {}),
					loading: false,
					error: action.payload as string,
				};
			});
	},
});

// Action creators are generated for each case reducer function
const historyUiActions = historySlice.actions;
const historyActions = { ...historyUiActions, ...historyApiActions };
export { historyActions };

const HistoryReducer = historySlice.reducer;
export default HistoryReducer;
