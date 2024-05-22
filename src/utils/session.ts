"use server";

import { cookies } from "next/headers";
import { addWeeks } from "date-fns/addWeeks";
import { CookieKey } from "~/enums/cookieKey";

interface Session {
	token: string;
	id: string; // User ID
}

export async function getSession(): Promise<Session> {
	const token = cookies().get(CookieKey.token)?.value || "";
	const id = cookies().get(CookieKey.id)?.value || "";
	return { token, id };
}

export async function createSession(token: string, id: string, dueTime?: number) {
	const expiresAt = addWeeks(new Date(), 1);
	cookies().set(CookieKey.token, token, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
	// cookies().set(CookieKey.id, id, {
	// 	httpOnly: true,
	// 	secure: true,
	// 	expires: expiresAt,
	// 	sameSite: "lax",
	// 	path: "/",
	// });
}

export async function deleteSession() {
	cookies().delete(CookieKey.token);
	cookies().delete(CookieKey.id);
}
