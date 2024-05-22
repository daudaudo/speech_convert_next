"use server";

import { headers } from "next/headers";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { FailedRequestError } from "~/errors/request";
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
	const parseBody = () => {
		if (method === RequestMethod.GET || method === RequestMethod.DELETE) {
			return null;
		}

		if (isFormData) {
			return body;
		}

		if (body) {
			return JSON.stringify(body);
		}

		return body;
	};

	if (!isFormData) {
		headers["Content-Type"] = "application/json";
	}

	const ip = await getRealIP();

	if (ip) {
		headers["X-Forwarded-For"] = ip;
		headers["X-Real-IP"] = ip;
	}

	const queryParams = new URLSearchParams(params).toString();
	const apiUrl = `${BASE_API_URL}/${url}?${queryParams}`;

	const fetchInit = {
		method,
		headers: headers,
		body: parseBody(),
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
				reject(new FailedRequestError("Request timed out"));
			}, timeout);
		});
		const apiPromise = callApi(url, method, body, params);
		const res = await Promise.race([timeoutPromise, apiPromise]);
		return res;
	} catch (error) {
		return error;
	}
};

export const getRealIP = async () => {
	const ip = headers().get("x-forwarded-for");
	return ip;
};
