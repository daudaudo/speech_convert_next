import { RequestMethod, RequestUrl } from "~/enums/request";
import { callApiAction } from "./utils";

const convertToSpeech = async (input: string, voice: string, model: string, speed: number) => {
	try {
		const res = await callApiAction(RequestUrl.convertToSpeech, RequestMethod.POST, { input, voice, model, speed });
		if (!res.success) {
			throw new Error(res.message);
		}
		return {
			id: res.data._id,
			input: res.data.input,
			streamUrl: res.data.stream_url,
			downloadUrl: res.data.download_url,
			voiceId: res.data?.voice ?? voice,
			model: res.data?.model ?? model,
			speed: res.data?.speed ?? speed,
		};
	} catch (error) {
		throw error;
	}
};

export default convertToSpeech;
