"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { SpeechResponseData } from "~/types/response/cts";

const convertToSpeech = async (formData: FormData) => {
	const res = await callApiAction(RequestUrl.convertToSpeech, RequestMethod.POST, formData);
	return res.data as SpeechResponseData;
};

export default convertToSpeech;
