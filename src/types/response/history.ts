import type { CTSModel, CTSVoiceId, CTSVoiceProvider } from "~/types/CTSTypes";
import type { CTTLanguage, CTTModel } from "~/types/CTTTypes";

type HistoryResponseData<ItemType = any> = {
	items: ItemType[];
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	from: number;
	to: number;
};

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
type SpeechHistoryResponseData = HistoryResponseData<SpeechHistoryItemResponseData>;

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
type TextHistoryResponseData = HistoryResponseData<TextHistoryItemResponseData>;

type ConversationHistoryItemResponseData = {
	_id: string;
	provider: CTSVoiceProvider;
	partials: { name: string; voice: CTSVoiceId; text: string; silent: number; audio_url: string }[];
	audio_url: string;
	created_at: string;
	update_at: string;
};
type ConversationHistoryResponseData = HistoryResponseData<ConversationHistoryItemResponseData>;

export type {
	SpeechHistoryItemResponseData,
	SpeechHistoryResponseData,
	TextHistoryItemResponseData,
	TextHistoryResponseData,
	ConversationHistoryItemResponseData,
	ConversationHistoryResponseData,
};
