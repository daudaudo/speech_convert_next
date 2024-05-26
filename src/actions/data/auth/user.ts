"use server";

import { request } from "~/actions/data";
import { RequestUrl } from "~/enums/request";
import { UserResponseData } from "~/types/response/user";

export const getAuthUser = async (token: string) => {
	const { data } = await request<UserResponseData>(RequestUrl.getUser, { bearer: token });
	return data;
};
