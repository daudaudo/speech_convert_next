"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTSPartial, User } from "~/types/CTSTypes";

const buildPartial = (users: User, text: string) => {
	//
	return [];
};

const convertToConversation = async (users: User, text: string) => {
	try {
		const partials: CTSPartial[] = buildPartial(users, text);
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
