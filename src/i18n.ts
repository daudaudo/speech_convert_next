import { getRequestConfig } from "next-intl/server";
import { getLocale } from "~/actions/cookies/locale";

const locales = ["en", "vi", "zh"];

export default getRequestConfig(async () => {
	const locale = await getLocale();
	const _locale = locales.includes(locale as string) ? locale : "en";

	return {
		locale: _locale,
		messages: (await import(`./assets/languages/${_locale}.json`)).default,
	};
});
