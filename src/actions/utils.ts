"use server";

import { RequestMethod, RequestUrl } from "~/enums/request";
import RequestError from "~/errors/request";
import { getSessionToken } from "~/utils/session";

const BASE_API_URL = process.env.BASE_API_URL;

const callApi = async (url: RequestUrl, method: RequestMethod, body: FormData | object | undefined) => {
	const { token } = await getSessionToken();
	const isFormData = typeof body === "object" && body instanceof FormData;
	const headers: HeadersInit = {
		Authorization: token ? `Bearer ${token}` : "",
	};
	if (!isFormData) {
		headers["Content-Type"] = "application/json";
	}
	const res = await fetch(`${BASE_API_URL}/${url}`, {
		method,
		headers: headers,
		body: isFormData ? body : JSON.stringify(body ?? {}),
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
