"use server";

import { cookies } from "next/headers";
import { addWeeks } from "date-fns/addWeeks";
import { CookieKey } from "~/enums/cookieKey";

export async function getSession(): Promise<string> {
	return cookies().get(CookieKey.token)?.value || "";
}

export async function createSession(token: string) {
	const expiresAt = addWeeks(new Date(), 1);
	cookies().set(CookieKey.token, token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	cookies().delete(CookieKey.token);
}
