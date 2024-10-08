"use server";

import { headers } from "next/headers";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { ResponseData } from "~/types/response";
import { FailedRequestError, RequestTimeoutError } from "~/errors/request";
import { getLocale } from "~/actions/cookies/locale";
import { getSession } from "~/actions/cookies/session";

const BASE_API_URL = process.env.BASE_API_URL;

export type RequestData = Record<string, string> | Record<string, any> | FormData | string | null | undefined;

export type RequestOptions = {
	method?: RequestMethod;
	data?: RequestData;
	timeout?: number;
	bearer?: string;
};

const getRealIP = async () => {
	const ip = headers().get("x-forwarded-for");
	return ip;
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

const buildHeaders = async (options: { method: RequestMethod; data: RequestData; bearer?: string }) => {
	const { method, data, bearer } = options;
	const headers: HeadersInit = {};

	const locale = await getLocale();
	if (locale) {
		headers["Accept-Language"] = locale;
	}

	const ip = await getRealIP();
	if (ip) {
		headers["X-Forwarded-For"] = ip;
		headers["X-Real-IP"] = ip;
	}

	if (bearer && bearer.length) {
		headers["Authorization"] = `Bearer ${bearer}`;
	}

	if ([RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE].includes(method)) {
		return headers;
	}

	if (typeof data === "object" && !(data instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}

	return headers;
};

const buildUrl = (method: RequestMethod, url: RequestUrl, data: RequestData) => {
	let absoluteUrl = BASE_API_URL + "/" + url;

	if (method === RequestMethod.POST || method === RequestMethod.PUT) {
		return absoluteUrl;
	}

	if (!data || data instanceof FormData) {
		return absoluteUrl;
	}

	if (typeof data === "object" && Object.keys(data).length) {
		const queryParams = new URLSearchParams(data).toString();
		absoluteUrl += "?" + queryParams;
	}

	return absoluteUrl;
};

const createTimeOutPromise = (timeout: number) => {
	return new Promise<never>((resolve, reject) => {
		setTimeout(() => reject(new RequestTimeoutError()), timeout);
	});
};

export const request = async <DataType = any>(name: RequestUrl, options: RequestOptions) => {
	const { method = RequestMethod.GET, data, timeout, bearer } = options;

	const init: RequestInit = {
		method,
		headers: await buildHeaders({ method, data, bearer }),
		body: await buildBody(method, data),
	};

	const url = buildUrl(method, name, data);

	const response = await new Promise<ResponseData<DataType>>((resolve, reject) => {
		if (typeof timeout === "number") {
			Promise.race([fetch(url, init), createTimeOutPromise(timeout)])
				.then((_response) => _response.json())
				.then((json) => resolve(json))
				.catch((error) => reject(error));
		} else {
			fetch(url, init)
				.then((_response) => _response.json())
				.then((json) => resolve(json))
				.catch((error) => reject(error));
		}
	});

	if (!response || !response.success) {
		throw new FailedRequestError(response.message ?? undefined);
	}

	return response;
};

export const requestAuthencated = async <DataType = any>(name: RequestUrl, options: RequestOptions) => {
	const token = await getSession();
	const authenticatedOptions: RequestOptions = { ...options, ...(token ? { bearer: token } : {}) };
	return request<DataType>(name, authenticatedOptions);
};
