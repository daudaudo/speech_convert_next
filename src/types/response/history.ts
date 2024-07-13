import type { CTSModel, CTSVoiceId, CTSVoiceProvider } from "~/types/CTSTypes";
import type { CTTLanguage, CTTModel } from "~/types/CTTTypes";

type SpeechHistoryItemResponseData = {
	_id: string;
	provider: CTSVoiceProvider;
	input: string;
	voice: CTSVoiceId;
	model: CTSModel;
	speed: number;
	owner: string;
	stream_url: string;
	download_url: string;
	created_at: string;
	update_at: string;
};

type SpeechHistoryResponseData =
	| {
			items: SpeechHistoryItemResponseData[];
			total: number;
			per_page: number;
			current_page: number;
			last_page: number;
			from: number;
			to: number;
	  }
	| undefined;

type TextHistoryItemResponseData = {
	_id: string;
	provider: CTSVoiceProvider;
	model: CTTModel;
	language: CTTLanguage;
	duration: number;
	text: string;
	segments: { start: number; end: number; text: string; _id: number }[];
	input_stream_url: string;
	created_at: string;
	update_at: string;
};

type TextHistoryResponseData =
	| {
			items: TextHistoryItemResponseData[];
			total: number;
			per_page: number;
			current_page: number;
			last_page: number;
			from: number;
			to: number;
	  }
	| undefined;

type ConversationHistoryItemResponseData = {
	_id: string;
	provider: CTSVoiceProvider;
	partials: { name: string; voice: CTSVoiceId; text: string; silent: number; audio_url: string }[];
	audio_url: string;
	created_at: string;
	update_at: string;
};

type ConversationHistoryResponseData =
	| {
			items: ConversationHistoryItemResponseData[];
			total: number;
			per_page: number;
			current_page: number;
			last_page: number;
			from: number;
			to: number;
	  }
	| undefined;

export type {
	SpeechHistoryItemResponseData,
	SpeechHistoryResponseData,
	TextHistoryItemResponseData,
	TextHistoryResponseData,
	ConversationHistoryItemResponseData,
	ConversationHistoryResponseData,
};
