"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import type { CTSPartial } from "~/types/CTSTypes";
import { ConversationResponseData } from "~/types/response/cts";

const convertToConversation = async (partials: CTSPartial[]) => {
	try {
		const res = await callApiAction(RequestUrl.convertToConversation, RequestMethod.POST, { partials });
		if (!res.success) {
			return { error: res.message as string };
		}
		return res.data as ConversationResponseData;
	} catch (error) {
		throw error;
	}
};

export default convertToConversation;
