"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { SpeechHistoryResponseData } from "~/types/response/history";

export default async function getSpeechHistory(limit: number | string, page: number | string) {
	const { data } = await requestAuthencated<SpeechHistoryResponseData>(RequestUrl.speechHistory, {
		method: RequestMethod.GET,
		data: { limit: limit.toString(), page: page.toString() },
	});
	return data;
}
