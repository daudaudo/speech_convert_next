import { LanguageCode } from "~/enums/language";
import type { Languages } from "~/types/language";

const supportedLanguages: LanguageCode[] = [LanguageCode.Vietnamese, LanguageCode.English, LanguageCode.Chinese];

const Languages: Languages = {
	[LanguageCode.Vietnamese]: {
		code: LanguageCode.Vietnamese,
		name: "Tiếng Việt",
		enName: "Vietnamese",
	},
	[LanguageCode.English]: {
		code: LanguageCode.English,
		name: "English",
		enName: "English",
	},
	[LanguageCode.Chinese]: {
		code: LanguageCode.Chinese,
		name: "中文",
		enName: "Chinese",
	},
};

export { Languages, supportedLanguages };
