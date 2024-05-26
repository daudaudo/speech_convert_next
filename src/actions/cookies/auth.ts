"use server";

import { addWeeks } from "date-fns/addWeeks";
import { cookies } from "next/headers";
import { CookieKey } from "~/enums/cookieKey";

export const getToken = async () => {
	return cookies().get(CookieKey.token)?.value;
};

export const removeToken = async () => {
	return cookies().delete(CookieKey.token);
};

export const setToken = async (token: string) => {
	const expiresAt = addWeeks(new Date(), 1);

	return cookies().set(CookieKey.token, token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
};
