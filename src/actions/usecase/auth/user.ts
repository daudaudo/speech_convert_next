"use server";

import { jwtVerify, SignJWT } from "jose";
import { headers } from "next/headers";
import { getAuthUser } from "~/actions/data/auth/user";
import { MissingJWTInHeaderError, MissingTokenInCookieError } from "~/errors/logic/auth";
import { AuthenticatedUser } from "~/types/auth";
import { getSession } from "~/actions/cookies/session";

const secret = new TextEncoder().encode(process.env.APP_JWT_SECRET);

export const getAuthUserByTokenCookie = async () => {
	const token = await getSession();
	if (!token || !token.length) {
		throw new MissingTokenInCookieError();
	}

	return await getAuthUser(token);
};

export const getAuthUserUseJwtHeader = async (): Promise<AuthenticatedUser> => {
	const jwt = headers().get("X-AUTH-JWT");
	if (!jwt || !jwt.length) {
		throw new MissingJWTInHeaderError();
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
