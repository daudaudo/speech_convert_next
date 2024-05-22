"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";

export async function getCTSHistory(limit: number, page: number) {
	try {
		const res = await callApiAction(RequestUrl.CTSHistory, RequestMethod.GET, undefined, {
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
