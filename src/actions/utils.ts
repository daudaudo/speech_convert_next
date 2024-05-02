"use server";

import { RequestMethod, RequestUrl } from "~/enums/request";
import RequestError from "~/errors/request";
import { getSessionToken } from "~/utils/section";

const DOMAIN = process.env.DOMAIN;
const API_VERSION = process.env.API_VERSION;

const callApi = async (url: RequestUrl, method: RequestMethod, body: object | undefined) => {
	const { token } = await getSessionToken();
	const res = await fetch(`${DOMAIN}/${API_VERSION}/${url}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		mode: "cors",
		body: JSON.stringify(body ?? {}),
	});
	return res.json();
};

type OptionsType = {
	timeout: number;
};
export const callApiAction = async (
	url: RequestUrl,
	method: RequestMethod,
	body: object | undefined,
	options?: OptionsType,
) => {
	try {
		const timeout = options?.timeout ?? 30000; // 30s
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new RequestError("Request timed out"));
			}, timeout);
		});
		const apiPromise = callApi(url, method, body);
		const res = await Promise.race([timeoutPromise, apiPromise]);
		return res;
	} catch (error) {
		return error;
	}
};
