"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { TranscriptionResponseData } from "~/types/response/ctt";

const convertToText = async (formData: FormData) => {
	try {
		const res = await callApiAction(RequestUrl.convertToText, RequestMethod.POST, formData);
		if (!res.success) {
			return { error: res.message as string };
		}
		return res.data as TranscriptionResponseData;
	} catch (error) {
		throw error;
	}
};

export default convertToText;
