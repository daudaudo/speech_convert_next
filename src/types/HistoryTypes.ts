import { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { CTTLanguage, CTTModel } from "~/types/CTTTypes";

type HistoryType = "cts" | "ctt" | "ctc";

type CTSHistoryType = {
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

type CTTHistoryType = {
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

export type { HistoryType, CTSHistoryType, CTTHistoryType };
