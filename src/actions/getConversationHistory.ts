"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { ConversationHistoryResponseData } from "~/types/response/history";

export default async function getConversationHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.conversationHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		return res.data as ConversationHistoryResponseData;
	} catch (error) {
		throw error;
	}
}
