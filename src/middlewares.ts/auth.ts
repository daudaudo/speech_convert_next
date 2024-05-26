"use server";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthUser } from "~/actions/data/auth/user";
import { signAuthenticatedUser } from "~/actions/usecase/auth/user";
import { CookieKey } from "~/enums/cookieKey";
import { MissingTokenInCookieError, UnauthorizedError } from "~/errors/logic/auth";

export const auth = async (request: NextRequest, response: NextResponse, required?: boolean) => {
	try {
		const token = request.cookies.get(CookieKey.token)?.value;
		if (!token || !token.length) {
			throw new MissingTokenInCookieError();
		}

		const user = await getAuthUser(token);
		const jwt = await signAuthenticatedUser(user);

		response.headers.set("X-AUTH-JWT", jwt);

		return response;
	} catch {
		request.cookies.delete(CookieKey.token);
		if (!!required) {
			throw new UnauthorizedError();
		}
	}
};
