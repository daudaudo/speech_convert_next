"use server";

import { RequestMethod, RequestUrl } from "~/enums/request";
import { callApiAction } from "./utils";

const convertToSpeech = async (formData: FormData) => {
	try {
		const input = formData.get("input");
		const voice = formData.get("voice");
		const model = formData.get("model");
		const speed = formData.get("speed");
		const res = await callApiAction(RequestUrl.convertToSpeech, RequestMethod.POST, { input, voice, model, speed });
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
