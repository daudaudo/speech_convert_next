"use server";

import { requestAuthencated } from "~/actions/data";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { TranscriptionResponseData } from "~/types/response/ctt";

const convertToText = async (formData: FormData) => {
	const { data } = await requestAuthencated<TranscriptionResponseData>(RequestUrl.convertToText, {
		method: RequestMethod.POST,
		data: formData,
	});
	return data;
};

export default convertToText;
