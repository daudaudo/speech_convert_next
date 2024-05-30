"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CTSHistoryType, CTTHistoryType, HistoryType } from "~/types/HistoryTypes";
import { getCTSHistory } from "~/actions/getCTSHistory";
import { getCTTHistory } from "~/actions/getCTTHistory";
import Loading from "~/components/animations/Loading";
import CTSListHistory from "~/components/page/history/CTSHistory";
import CTTListHistory from "~/components/page/history/CTTHistory";
import withSuspense from "~/hocs/withSuspense";

const History = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>(undefined);
	const [history, setHistory] = useState<CTSHistoryType[] | CTTHistoryType[]>([]);
	const [pageState, setPageState] = useState<{
		currentPage: number;
		lastPage: number;
		from: number;
		to: number;
		total: number;
	}>({
		currentPage: 0,
		lastPage: 0,
		from: 0,
		to: 0,
		total: 0,
	});

	const onChangePage = (page: number) => {
		console.log(">> page", { page });
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set("page", page.toString());
		const search = current.toString();
		const query = search ? `?${search}` : "";
		router.push(`${pathname}${query}`);
	};

	const requestGetHistory = useCallback(() => {
		const type: HistoryType = (searchParams.get("type") ?? "cts") as HistoryType;
		const page = searchParams.get("page") ?? 1;
		const limit = searchParams.get("limit") ?? 2;
		const requestFunc = type === "cts" ? getCTSHistory : getCTTHistory;
		startTransition(async () => {
			const res = await requestFunc(limit, page);
			if ("error" in res) {
				setError(res.error);
			} else {
				setError(undefined);
				setHistory(res.history);
				setPageState({
					currentPage: res.current_page ?? 0,
					lastPage: res.last_page ?? 0,
					from: res.from,
					to: res.to,
					total: res.total,
				});
			}
		});
	}, [searchParams]);

	useEffect(() => {
		if (searchParams) requestGetHistory();
	}, [searchParams, requestGetHistory]);

	if (pending) return <Loading />;
	if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

	if (searchParams.get("type") === "cts")
		return (
			<CTSListHistory
				history={history as CTSHistoryType[]}
				currentPage={pageState.currentPage}
				lastPage={pageState.lastPage}
				from={pageState.from}
				to={pageState.to}
				total={pageState.total}
				onChangePage={onChangePage}
			/>
		);
	if (searchParams.get("type") === "ctt")
		return (
			<CTTListHistory
				history={history as CTTHistoryType[]}
				currentPage={pageState.currentPage}
				lastPage={pageState.lastPage}
				from={pageState.from}
				to={pageState.to}
				total={pageState.total}
				onChangePage={onChangePage}
			/>
		);
	return;
};

const HistoryPage = withSuspense(History, <Loading />);

export default HistoryPage;
