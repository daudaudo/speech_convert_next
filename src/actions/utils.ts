"use server";

const SPEECH_CONVERT_DOMAIN = "http://localhost:3000";
const API_VERSION = "api/v1";

const callApi = async (url: string, method: string, body: object | undefined) => {
	const res = await fetch(`${SPEECH_CONVERT_DOMAIN}/${API_VERSION}/${url}`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: body && JSON.stringify(body),
	});
	return res.json();
};

export const callApiAction = async (url: string, method: string, body: object | undefined) => {
	const res = await callApi(url, method, body);
	return res;
};
