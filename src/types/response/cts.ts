import { CTSModel, CTSVoiceId } from "~/types/CTSTypes";

export type ConversationResponseData = {
	_id: string;
	partials: {
		name: string;
		text: string;
		voice: CTSVoiceId;
		silence: number;
		audio_url: string;
	}[];
	audio_url: string;
	created_at: string;
	updated_at: string;
};

export type SpeechResponseData = {
	_id: string;
	input: string;
	voice: CTSVoiceId;
	model: CTSModel;
	speed: number;
	owner: string;
	stream_url: string;
	download_url: string;
	created_at: string;
	updated_at: string;
};
