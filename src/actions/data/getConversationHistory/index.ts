"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { ConversationHistoryResponseData } from "~/types/response/history";

export default async function getConversationHistory(limit: number | string, page: number | string) {
	const { data } = await requestAuthencated<ConversationHistoryResponseData>(RequestUrl.conversationHistory, {
		method: RequestMethod.GET,
		data: { limit: limit.toString(), page: page.toString() },
	});
	return data;
}
