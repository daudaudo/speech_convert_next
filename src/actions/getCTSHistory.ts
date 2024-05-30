"use server";

import { callApiAction } from "~/actions/utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { CTSHistoryType } from "~/types/HistoryTypes";

export async function getCTSHistory(limit: number | string, page: number | string) {
	try {
		const res = await callApiAction(RequestUrl.CTSHistory, RequestMethod.GET, undefined, {
			limit: limit.toString(),
			page: page.toString(),
		});
		if (!res.success) {
			return { error: res.message };
		}
		return {
			history: res.data?.items as CTSHistoryType[],
			total: res.data?.total as number,
			per_page: res.data?.per_page as number,
			current_page: res.data?.current_page as number,
			last_page: res.data?.last_page as number,
			from: res.data?.from as number,
			to: res.data?.to as number,
		};
	} catch (error) {
		throw error;
	}
}
