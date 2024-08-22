import { createAsyncThunk } from "@reduxjs/toolkit";
import getReferenceGoogleVoice from "~/actions/data/getReferenceGoogleVoice";

const ACTIONS = {
	FETCH_GOOGLE_VOICES: "voice/fetchGoogleVoices",
};

const fetchGoogleVoices = createAsyncThunk(
	ACTIONS.FETCH_GOOGLE_VOICES,
	async (payload: undefined, { rejectWithValue }) => {
		try {
			const data = await getReferenceGoogleVoice();
			return { data };
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const voiceApiActions = {
	fetchGoogleVoices,
};

export default voiceApiActions;
