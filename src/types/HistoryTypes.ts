import { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { CTTLanguage, CTTModel } from "~/types/CTTTypes";

type HistoryType = "cts" | "ctt";

type CTSHistory = {
	_id: string;
	input: string;
	voice: CTSVoiceId;
	model: CTSModel;
	speed: number;
	owner: string;
	stream_url: string;
	download_url: string;
};

type CTTHistory = {
	_id: string;
	model: CTTModel;
	language: CTTLanguage;
	duration: number;
	text: string;
	segments: { start: number; end: number; text: string; _id: number }[];
	input_stream_url: string;
};

export type { HistoryType, CTSHistory, CTTHistory };
