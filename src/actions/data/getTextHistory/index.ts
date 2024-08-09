"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { TextHistoryResponseData } from "~/types/response/history";

export default async function getTextHistory(limit: number | string, page: number | string) {
	const { data } = await requestAuthencated<TextHistoryResponseData>(RequestUrl.textHistory, {
		method: RequestMethod.GET,
		data: { limit: limit.toString(), page: page.toString() },
	});
	return data;
}
