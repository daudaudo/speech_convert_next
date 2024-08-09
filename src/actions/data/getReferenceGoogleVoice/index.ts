"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { ReferenceGoogleVoiceResponseData } from "~/types/response/reference";

const getReferenceGoogleVoice = async () => {
	const { data } = await requestAuthencated<ReferenceGoogleVoiceResponseData>(RequestUrl.referenceGoogleVoice, {
		method: RequestMethod.GET,
	});
	return data;
};

export default getReferenceGoogleVoice;
