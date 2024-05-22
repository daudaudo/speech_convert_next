"use server";

import { request } from "~/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { LoginResponseData } from "~/types/response/auth";

export const login = async (payload: { code: string }) => {
	const { code } = payload;

	const { data } = await request<LoginResponseData>(RequestUrl.signinGoogle, {
		method: RequestMethod.POST,
		data: { code },
	});

	return data;
};
