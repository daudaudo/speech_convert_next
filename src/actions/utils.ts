"use server";

import { RequestMethod, RequestUrl } from "~/enums/request";
import RequestError from "~/errors/request";
import { getSession } from "~/utils/session";

const BASE_API_URL = process.env.BASE_API_URL;

const callApi = async (
	url: RequestUrl,
	method: RequestMethod,
	body: FormData | object | undefined,
	params: Record<string, string> = {}, // Thêm đối số params mặc định là một đối tượng trống
) => {
	const { token } = await getSession();
	const isFormData = typeof body === "object" && body instanceof FormData;
	const headers: HeadersInit = {
		Authorization: token ? `Bearer ${token}` : "",
	};
	if (!isFormData) {
		headers["Content-Type"] = "application/json";
	}

	const queryParams = new URLSearchParams(params).toString();
	const apiUrl = `${BASE_API_URL}/${url}?${queryParams}`;

	const fetchInit = {
		method,
		headers: headers,
		body:
			method !== RequestMethod.GET && method !== RequestMethod.DELETE
				? isFormData
					? body
					: JSON.stringify(body ?? {})
				: null,
	};
	const res = await fetch(apiUrl, fetchInit);
	return res.json();
};

type OptionsType = {
	timeout: number;
};
export const callApiAction = async (
	url: RequestUrl,
	method: RequestMethod,
	body?: object | undefined,
	params?: Record<string, string>,
	options?: OptionsType,
) => {
	try {
		const timeout = options?.timeout ?? 30000; // 30s
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new RequestError("Request timed out"));
			}, timeout);
		});
		const apiPromise = callApi(url, method, body, params);
		const res = await Promise.race([timeoutPromise, apiPromise]);
		return res;
	} catch (error) {
		return error;
	}
};
