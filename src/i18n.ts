import { getRequestConfig } from "next-intl/server";
import { getLocale } from "~/actions/cookies/locale";
import { supportedLanguages } from "~/constants/language";
import { LanguageCode } from "~/enums/language";

export default getRequestConfig(async () => {
	const locale = await getLocale();
	const _locale = supportedLanguages.includes(locale as LanguageCode) ? locale : "en";

	return {
		locale: _locale,
		messages: (await import(`./assets/languages/${_locale}.json`)).default,
	};
});
