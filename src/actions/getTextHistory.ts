"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { TextHistoryResponseData } from "~/types/response/history";

export default async function getTextHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.textHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		return res.data as TextHistoryResponseData;
	} catch (error) {
		throw error;
	}
}
