"use server";

import { addWeeks } from "date-fns/addWeeks";
import { cookies } from "next/headers";
import { CookieKey } from "~/enums/cookieKey";
import { LanguageCode } from "~/enums/language";

const getLocale = async () => {
	return cookies().get(CookieKey.locale)?.value;
};

const setLocale = async (locale: LanguageCode) => {
	const expiresAt = addWeeks(new Date(), 1);

	return cookies().set(CookieKey.locale, locale, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
};

export { getLocale, setLocale };
