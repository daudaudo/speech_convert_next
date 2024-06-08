"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { SpeechHistoryResponseData } from "~/types/response/history";

export default async function getSpeechHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.speechHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		return res.data as SpeechHistoryResponseData;
	} catch (error) {
		throw error;
	}
}
