"use server";

import { redirect } from "next/navigation";
import { request } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { LoginResponseData, RegisterResponseData } from "~/types/response/auth";

export const loginUseCredentials = async (email: string, password: string) => {
	const { data } = await request<LoginResponseData>(RequestUrl.signin, {
		method: RequestMethod.POST,
		data: {
			email,
			password,
		},
	});
	return data;
};

export const registerUseCredentials = async (payload: { username: string; email: string; password: string }) => {
	const { username, email, password } = payload;

	const { data } = await request<RegisterResponseData>(RequestUrl.signup, {
		method: RequestMethod.POST,
		data: {
			username,
			email,
			password,
		},
	});
	return data;
};

export async function navigateSigninByGoogleCallback() {
	const { data } = await request(RequestUrl.signinGoogleCallback, {
		method: RequestMethod.GET,
	});
	if (data?.callback_url) redirect(data.callback_url);
}
