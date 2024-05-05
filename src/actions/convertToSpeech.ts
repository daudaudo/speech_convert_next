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
			stream: res.data.stream_url,
			download: res.data.download_url,
		};
	} catch (error) {
		throw error;
	}
};

export default convertToSpeech;
