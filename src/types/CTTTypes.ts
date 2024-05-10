import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";

type CTTType = "speech" | "document" | "text";

// Input types for the ConvertToText
type CTTInput = {
	text: string;
	file: File | null;
};

// Model types for the ConvertToText
type CTTModel = OpenAITranscriptionModel;

// language types for the ConvertToText
type CTTLanguage = LanguageCode;

// Config types for the ConvertToText
type CTTConfig = {
	maxTextLength?: number;
	fileAccept?: string[];
	maxFileSize?: number;
};
const CTTDefaultConfig: CTTConfig = {
	maxTextLength: 2048,
	maxFileSize: 10 * 1024 * 1024, // 10MB
	fileAccept: [".mp3", ".wav", ".occ", ".ogg"],
};

// Output types for the ConvertToText
type CTTOutput = {
	id: string;
	text: string;
	language: CTTLanguage;
	segments: { start: number; end: number; text: string; id: number }[];
	duration: number;
};

type CTTError = {
	[key in CTTType]?: string;
};

export { CTTDefaultConfig };
export type { CTTType, CTTInput, CTTModel, CTTLanguage, CTTConfig, CTTOutput, CTTError };
