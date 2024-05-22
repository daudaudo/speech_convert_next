"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";

export async function getCTTHistory(limit: number, page: number) {
	try {
		const res = await callApiAction(RequestUrl.CTTHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		if (!res.success) {
			return { message: res.message };
		}
		return res.data?.items;
	} catch (error) {
		throw error;
	}
}
