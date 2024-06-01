"use server";

import { cookies } from "next/headers";
import { CookieKey } from "~/enums/cookieKey";

const getLocale = async () => {
	return cookies().get(CookieKey.locale)?.value;
};

export { getLocale };
