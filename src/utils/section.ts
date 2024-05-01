"use server";

import { cookies } from "next/headers";
import { CookieKey } from "~/enums/cookieKey";

interface Session {
	token: string;
	// id: string; // User ID
}

export async function getSessionToken(): Promise<Session> {
	const token = cookies().get(CookieKey.token)?.value || "";
	return { token };
}

export async function createSession(token: string, dueTime?: number) {
	const _dueTime = dueTime ?? 30 * 24 * 60 * 60 * 1000; // 7 days
	const expiresAt = new Date(Date.now() + _dueTime);
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

export async function updateSession(token: string) {
	cookies().set(CookieKey.token, token);
}
