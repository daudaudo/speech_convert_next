"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import type { CTSPartial, CTSVoiceProvider } from "~/types/CTSTypes";
import { ConversationResponseData } from "~/types/response/cts";

const convertToConversation = async (provider: CTSVoiceProvider, partials: CTSPartial[]) => {
	const { data } = await requestAuthencated<ConversationResponseData>(RequestUrl.convertToConversation, {
		method: RequestMethod.POST,
		data: { provider, partials },
	});
	return data;
};

export default convertToConversation;
