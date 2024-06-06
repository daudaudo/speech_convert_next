"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTSPartial } from "~/types/CTSTypes";

const convertToConversation = async (partials: CTSPartial[]) => {
	try {
		const res = await callApiAction(RequestUrl.convertToConversation, RequestMethod.POST, partials);
		if (!res.success) {
			return { error: res.message };
		}
		return {
			id: res.data?._id,
			partials: res.data?.partials,
			audioUrl: res.data?.audio_url,
		};
	} catch (error) {
		throw error;
	}
};

export default convertToConversation;
