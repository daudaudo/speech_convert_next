"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { SpeechResponseData } from "~/types/response/cts";

const convertToSpeech = async (formData: FormData) => {
	const { data } = await requestAuthencated<SpeechResponseData>(RequestUrl.convertToSpeech, {
		method: RequestMethod.POST,
		data: formData,
	});
	return data;
};

export default convertToSpeech;
