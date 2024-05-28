"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTSHistory } from "~/types/HistoryTypes";

export async function getCTSHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.CTSHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		if (!res.success) {
			return { error: res.message };
		}
		return res.data?.items as CTSHistory[];
	} catch (error) {
		throw error;
	}
}
