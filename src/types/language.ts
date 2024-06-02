import { LanguageCode } from "~/enums/language";

type Language = {
	code: LanguageCode;
	name: string;
	enName: string;
};

type Languages = {
	[key in LanguageCode]: Language;
};

export type { Language, Languages };
