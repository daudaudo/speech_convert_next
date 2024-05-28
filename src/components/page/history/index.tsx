"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { getCTSHistory } from "~/actions/getCTSHistory";
import { getCTTHistory } from "~/actions/getCTTHistory";
import Loading from "~/components/animations/Loading";
import CTSListHistory from "~/components/page/history/CTSHistory";
import CTTListHistory from "~/components/page/history/CTTHistory";
import withSuspense from "~/hocs/withSuspense";
import type { CTSHistory, CTTHistory, HistoryType } from "~/types/HistoryTypes";

const History = () => {
	const searchParams = useSearchParams();
	const type: HistoryType = (searchParams.get("type") ?? "cts") as HistoryType;
	const page = searchParams.get("page") ?? 1;
	const limit = searchParams.get("limit") ?? 10;

	const initRef = useRef(false);
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>(undefined);
	const [history, setHistory] = useState<(CTSHistory | CTTHistory)[]>([]);

	const requestGetHistory = useCallback(() => {
		const requestFunc = type === "cts" ? getCTSHistory : getCTTHistory;
		startTransition(async () => {
			const res = await requestFunc(limit, page);
			if ("error" in res) {
				setError(res.error);
			} else {
				setError(undefined);
				setHistory(res);
			}
		});
	}, [searchParams]);

	useEffect(() => {
		if (initRef.current) {
			return;
		}
		requestGetHistory();
		return () => {
			initRef.current = true;
		};
	}, [requestGetHistory]);

	if (pending) return <Loading />;
	if (error) return <div>{error}</div>;

	if (type === "cts") return <CTSListHistory history={history as CTSHistory[]} />;
	if (type === "ctt") return <CTTListHistory history={history as CTTHistory[]} />;
	return;
};

const HistoryPage = withSuspense(History, <Loading />);

export default HistoryPage;
