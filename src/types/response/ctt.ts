import { VoiceProvider } from "~/enums/voice";

type UserBalanceResponse = {
	used_balance: number;
	balance: number;
};

export type TranscriptionResponseData = {
	_id: string;
	provider: VoiceProvider;
	model: string;
	language: string;
	duration: number;
	text: string;
	segments: {
		start: number;
		end: number;
		text: string;
		_id: string;
	}[];
	input_stream_url: string;
	user: UserBalanceResponse;
	created_at: string;
	updated_at: string;
};
