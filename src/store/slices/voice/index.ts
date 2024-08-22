import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VoiceProvider } from "~/enums/voice";
import voiceApiActions from "~/store/slices/voice/voiceApiActions";
import { ReferenceGoogleVoiceResponseData } from "~/types/response/reference";

interface VoiceState {
	[VoiceProvider.GOOGLE]: ReferenceGoogleVoiceResponseData;
	// other provider
}

const initialState: VoiceState = {
	[VoiceProvider.GOOGLE]: [],
};

export const voiceSlice = createSlice({
	name: "voice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			voiceApiActions.fetchGoogleVoices.fulfilled,
			(state, action: PayloadAction<{ data: ReferenceGoogleVoiceResponseData }>) => {
				state[VoiceProvider.GOOGLE] = action.payload.data;
			},
		);
	},
});

// Action creators are generated for each case reducer function
const voiceUiActions = voiceSlice.actions;
const voiceActions = { ...voiceUiActions, ...voiceApiActions };
export { voiceActions };

const VoiceReducer = voiceSlice.reducer;
export default VoiceReducer;
