"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";

export async function getMeUser() {
	try {
		const res = await callApiAction(RequestUrl.getUser, RequestMethod.GET);
		return res;
	} catch (error) {
		throw error;
	}
}
