import { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { CTTLanguage, CTTModel } from "~/types/CTTTypes";

type SpeechHistoryItemResponseData = {
	_id: string;
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

export type {
	SpeechHistoryItemResponseData,
	SpeechHistoryResponseData,
	TextHistoryItemResponseData,
	TextHistoryResponseData,
};
