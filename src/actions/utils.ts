"use server";

import { headers } from "next/headers";
import { getLocale } from "~/actions/cookies/locale";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { FailedRequestError } from "~/errors/request";
import { getSession } from "~/utils/session";

const BASE_API_URL = process.env.BASE_API_URL;

type RequestData = FormData | object | undefined;

const buildHeaders = async (options: { method: RequestMethod; body: RequestData }) => {
	const { method, body } = options;
	const headers: HeadersInit = {};
	const { token } = await getSession();
	headers["Authorization"] = token ? `Bearer ${token}` : "";
	const locale = await getLocale();
	if (locale) {
		headers["Accept-Language"] = locale;
	}
	const ip = await getRealIP();
	if (ip) {
		headers["X-Forwarded-For"] = ip;
		headers["X-Real-IP"] = ip;
	}
	if ([RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE].includes(method)) {
		return headers;
	}
	if (typeof body === "object" && !(body instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}
	return headers;
};

const buildBody = async (method: RequestMethod, data: RequestData) => {
	if ([RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE].includes(method)) {
		return null;
	}
	if (data instanceof FormData) {
		return data;
	}
	if (typeof data === "object") {
		return JSON.stringify(data);
	}
	return data;
};

const buildUrl = (method: RequestMethod, url: RequestUrl, params: Record<string, string>) => {
	const absoluteUrl = BASE_API_URL + "/" + url;
	if (method !== RequestMethod.GET) {
		return absoluteUrl;
	}
	const queryParams = new URLSearchParams(params).toString();
	return `${absoluteUrl}?${queryParams}`;
};

const callApi = async (
	url: RequestUrl,
	method: RequestMethod,
	body: FormData | object | undefined,
	params: Record<string, string> = {},
) => {
	const headersData = await buildHeaders({ method, body });
	const bodyData = await buildBody(method, body);
	const apiUrl = buildUrl(method, url, params);
	const fetchInit = {
		method,
		headers: headersData,
		body: bodyData,
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
