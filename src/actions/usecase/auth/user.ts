"use server";

import { jwtVerify, SignJWT } from "jose";
import { headers } from "next/headers";
import { MissingJWTInHeaderError } from "~/errors/logic/auth";
import { AuthenticatedUser } from "~/types/auth";

const secret = new TextEncoder().encode(process.env.APP_JWT_SECRET);

const verifyJWTAuthenticatedUser = async (jwt: string) => {
	const verified = await jwtVerify<AuthenticatedUser>(jwt, secret);
	const payload = verified.payload;
	return payload;
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
