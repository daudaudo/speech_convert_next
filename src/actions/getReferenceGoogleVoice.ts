"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { ReferenceGoogleVoiceResponseData } from "~/types/response/reference";

const getReferenceGoogleVoice = async () => {
	const res = await callApiAction(RequestUrl.referenceGoogleVoice, RequestMethod.GET);
	if (!res.success) {
		return { error: res.message as string };
	}
	return res.data as ReferenceGoogleVoiceResponseData;
};

export default getReferenceGoogleVoice;
