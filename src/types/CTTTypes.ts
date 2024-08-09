import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";

// Model types for the ConvertToText
type CTTModel = OpenAITranscriptionModel;

// language types for the ConvertToText
type CTTLanguage = LanguageCode;

export type { CTTModel, CTTLanguage };
