"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";

const convertToText = async (formData: FormData) => {
	try {
		const res = await callApiAction(RequestUrl.convertToText, RequestMethod.POST, formData);
		if (!res.success) {
			return { error: res.message };
		}
		return {
			id: res.data?._id,
			text: res.data?.text,
			language: res.data?.language,
			segments: res.data?.segments,
			duration: res.data?.duration,
		};
	} catch (error) {
		throw error;
	}
};

export default convertToText;
