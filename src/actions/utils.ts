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
		body: JSON.stringify(body ?? {}),
	});
	return res.json();
};

const TIMEOUT = 30000; // 30 seconds
export const callApiAction = async (url: RequestUrl, method: RequestMethod, body: object | undefined) => {
	try {
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new RequestError("Request timed out"));
			}, TIMEOUT);
		});
		const apiPromise = callApi(url, method, body);
		const res = await Promise.race([timeoutPromise, apiPromise]);
		return res;
	} catch (error) {
		return error;
	}
};
