"use server";

import { cookies } from "next/headers";
import { CookieKey } from "~/enums/cookieKey";

export async function createSession(token: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	cookies().set(CookieKey.token, token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}
