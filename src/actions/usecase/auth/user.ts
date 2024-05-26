"use server";

import { jwtVerify, SignJWT } from "jose";
import { headers } from "next/headers";
import { getToken } from "~/actions/cookies/auth";
import { getAuthUser } from "~/actions/data/auth/user";
import { MissingJWTInCookieError, MissingTokenInCookieError } from "~/errors/logic/auth";
import { AuthenticatedUser } from "~/types/auth";

const secret = new TextEncoder().encode(process.env.APP_JWT_SECRET);

export const getAuthUserByTokenCookie = async () => {
	const token = await getToken();
	if (!token || !token.length) {
		throw new MissingTokenInCookieError();
	}

	return await getAuthUser(token);
};

export const getAuthUserUseJwtHeader = async (): Promise<AuthenticatedUser> => {
	const jwt = headers().get("X-AUTH-JWT");

	if (!jwt || !jwt.length) {
		throw new MissingJWTInCookieError();
	}

	return await verifyJWTAuthenticatedUser(jwt);
};

export const signAuthenticatedUser = async (authenticated: AuthenticatedUser) => {
	const jwt = await new SignJWT({ ...authenticated })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);

	return jwt;
};

export const verifyJWTAuthenticatedUser = async (jwt: string) => {
	const verified = await jwtVerify<AuthenticatedUser>(jwt, secret);
	const payload = verified.payload;

	return payload;
};
