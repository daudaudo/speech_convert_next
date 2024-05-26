"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";

const convertToSpeech = async (formData: FormData) => {
	try {
		const res = await callApiAction(RequestUrl.convertToSpeech, RequestMethod.POST, formData);
		if (!res.success) {
			return { error: res.message };
		}
		return {
			id: res.data?._id,
			input: res.data?.input,
			streamUrl: res.data?.stream_url,
			downloadUrl: res.data?.download_url,
			voiceId: res.data?.voice,
			model: res.data?.model,
			speed: res.data?.speed,
		};
	} catch (error) {
		throw error;
	}
};

export default convertToSpeech;
