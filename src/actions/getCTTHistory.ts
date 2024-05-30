"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTTHistoryType } from "~/types/HistoryTypes";

export async function getCTTHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.CTTHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		if (!res.success) {
			return { error: res.message };
		}
		return {
			history: res.data?.items as CTTHistoryType[],
			total: res.data?.total,
			per_page: res.data?.per_page,
			current_page: res.data?.current_page,
			last_page: res.data?.last_page,
			from: res.data?.from,
			to: res.data?.to,
		};
	} catch (error) {
		throw error;
	}
}
