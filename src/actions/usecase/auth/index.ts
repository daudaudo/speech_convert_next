"use server";

import { removeToken, setToken } from "~/actions/cookies/auth";
import { loginUseCredentials, registerUseCredentials } from "~/actions/data/auth";

export const logout = async () => {
	await removeToken();
};

export const login = async (email: string, password: string) => {
	const { access_token } = await loginUseCredentials(email, password);
	await setToken(access_token);
};

export const register = async (payload: { username: string; email: string; password: string }) => {
	const { access_token } = await registerUseCredentials(payload);
	await setToken(access_token);
};
