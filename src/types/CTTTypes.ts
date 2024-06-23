import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";

// Model types for the ConvertToText
type CTTModel = OpenAITranscriptionModel;

// language types for the ConvertToText
type CTTLanguage = LanguageCode;

// Output types for the ConvertToText
type CTTOutput = {
	id: string;
	text: string;
	language: CTTLanguage;
	segments: { start: number; end: number; text: string; id: number }[];
	duration: number;
};

export type { CTTModel, CTTLanguage, CTTOutput };
