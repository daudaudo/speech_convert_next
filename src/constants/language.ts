import { LanguageCode } from "~/enums/language";
import type { Languages } from "~/types/language";

const supportedLanguages: LanguageCode[] = [LanguageCode.Vietnamese, LanguageCode.English, LanguageCode.Chinese];
const GoogleLanguageOptions = [
	LanguageCode.Arabic,
	LanguageCode.Bulgarian,
	LanguageCode.Catalan,
	LanguageCode.Czech,
	LanguageCode.Danish,
	LanguageCode.Dutch,
	LanguageCode.English,
	LanguageCode.Finnish,
	LanguageCode.French,
	LanguageCode.German,
	LanguageCode.Greek,
	LanguageCode.Hebrew,
	LanguageCode.Hindi,
	LanguageCode.Hungarian,
	LanguageCode.Indonesian,
	LanguageCode.Italian,
	LanguageCode.Japanese,
	LanguageCode.Korean,
	LanguageCode.Latvian,
	LanguageCode.Lithuanian,
	LanguageCode.Norwegian,
	LanguageCode.Polish,
	LanguageCode.Portuguese,
	LanguageCode.Romanian,
	LanguageCode.Russian,
	LanguageCode.Slovak,
	LanguageCode.Slovenian,
	LanguageCode.Spanish,
	LanguageCode.Swedish,
	LanguageCode.Thai,
	LanguageCode.Turkish,
	LanguageCode.Ukrainian,
	LanguageCode.Vietnamese,
	LanguageCode.Chinese,
];

const Languages: Languages = {
	[LanguageCode.Arabic]: {
		code: LanguageCode.Arabic,
		name: "العربية",
		enName: "Arabic",
	},
	[LanguageCode.Bulgarian]: {
		code: LanguageCode.Bulgarian,
		name: "Български",
		enName: "Bulgarian",
	},
	[LanguageCode.Catalan]: {
		code: LanguageCode.Catalan,
		name: "Català",
		enName: "Catalan",
	},
	[LanguageCode.Czech]: {
		code: LanguageCode.Czech,
		name: "Čeština",
		enName: "Czech",
	},
	[LanguageCode.Danish]: {
		code: LanguageCode.Danish,
		name: "Dansk",
		enName: "Danish",
	},
	[LanguageCode.Dutch]: {
		code: LanguageCode.Dutch,
		name: "Nederlands",
		enName: "Dutch",
	},
	[LanguageCode.English]: {
		code: LanguageCode.English,
		name: "English",
		enName: "English",
	},
	[LanguageCode.Finnish]: {
		code: LanguageCode.Finnish,
		name: "Suomi",
		enName: "Finnish",
	},
	[LanguageCode.French]: {
		code: LanguageCode.French,
		name: "Français",
		enName: "French",
	},
	[LanguageCode.German]: {
		code: LanguageCode.German,
		name: "Deutsch",
		enName: "German",
	},
	[LanguageCode.Greek]: {
		code: LanguageCode.Greek,
		name: "Ελληνικά",
		enName: "Greek",
	},
	[LanguageCode.Hebrew]: {
		code: LanguageCode.Hebrew,
		name: "עברית",
		enName: "Hebrew",
	},
	[LanguageCode.Hindi]: {
		code: LanguageCode.Hindi,
		name: "हिन्दी",
		enName: "Hindi",
	},
	[LanguageCode.Hungarian]: {
		code: LanguageCode.Hungarian,
		name: "Magyar",
		enName: "Hungarian",
	},
	[LanguageCode.Indonesian]: {
		code: LanguageCode.Indonesian,
		name: "Bahasa Indonesia",
		enName: "Indonesian",
	},
	[LanguageCode.Italian]: {
		code: LanguageCode.Italian,
		name: "Italiano",
		enName: "Italian",
	},
	[LanguageCode.Japanese]: {
		code: LanguageCode.Japanese,
		name: "日本語",
		enName: "Japanese",
	},
	[LanguageCode.Korean]: {
		code: LanguageCode.Korean,
		name: "한국어",
		enName: "Korean",
	},
	[LanguageCode.Latvian]: {
		code: LanguageCode.Latvian,
		name: "Latviešu",
		enName: "Latvian",
	},
	[LanguageCode.Lithuanian]: {
		code: LanguageCode.Lithuanian,
		name: "Lietuvių",
		enName: "Lithuanian",
	},
	[LanguageCode.Norwegian]: {
		code: LanguageCode.Norwegian,
		name: "Norsk",
		enName: "Norwegian",
	},
	[LanguageCode.Polish]: {
		code: LanguageCode.Polish,
		name: "Polski",
		enName: "Polish",
	},
	[LanguageCode.Portuguese]: {
		code: LanguageCode.Portuguese,
		name: "Português",
		enName: "Portuguese",
	},
	[LanguageCode.Romanian]: {
		code: LanguageCode.Romanian,
		name: "Română",
		enName: "Romanian",
	},
	[LanguageCode.Russian]: {
		code: LanguageCode.Russian,
		name: "Русский",
		enName: "Russian",
	},
	[LanguageCode.Slovak]: {
		code: LanguageCode.Slovak,
		name: "Slovenčina",
		enName: "Slovak",
	},
	[LanguageCode.Slovenian]: {
		code: LanguageCode.Slovenian,
		name: "Slovenščina",
		enName: "Slovenian",
	},
	[LanguageCode.Spanish]: {
		code: LanguageCode.Spanish,
		name: "Español",
		enName: "Spanish",
	},
	[LanguageCode.Swedish]: {
		code: LanguageCode.Swedish,
		name: "Svenska",
		enName: "Swedish",
	},
	[LanguageCode.Thai]: {
		code: LanguageCode.Thai,
		name: "ไทย",
		enName: "Thai",
	},
	[LanguageCode.Turkish]: {
		code: LanguageCode.Turkish,
		name: "Türkçe",
		enName: "Turkish",
	},
	[LanguageCode.Ukrainian]: {
		code: LanguageCode.Ukrainian,
		name: "Українська",
		enName: "Ukrainian",
	},
	[LanguageCode.Vietnamese]: {
		code: LanguageCode.Vietnamese,
		name: "Tiếng Việt",
		enName: "Vietnamese",
	},
	[LanguageCode.Chinese]: {
		code: LanguageCode.Chinese,
		name: "中文",
		enName: "Chinese",
	},
};

export { Languages, supportedLanguages, GoogleLanguageOptions };
