"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTTHistory } from "~/types/HistoryTypes";

export async function getCTTHistory(limit: number, page: number) {
	try {
		const res = await callApiAction(RequestUrl.CTTHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		if (!res.success) {
			return { error: res.message };
		}
		return res.data?.items as CTTHistory[];
	} catch (error) {
		throw error;
	}
}
