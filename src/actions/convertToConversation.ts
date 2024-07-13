"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import type { CTSPartial, CTSVoiceProvider } from "~/types/CTSTypes";
import { ConversationResponseData } from "~/types/response/cts";

const convertToConversation = async (provider: CTSVoiceProvider, partials: CTSPartial[]) => {
	try {
		const res = await callApiAction(RequestUrl.convertToConversation, RequestMethod.POST, { provider, partials });
		if (!res.success) {
			return { error: res.message as string };
		}
		return res.data as ConversationResponseData;
	} catch (error) {
		throw error;
	}
};

export default convertToConversation;
