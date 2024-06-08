"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getConversationHistory from "~/actions/getConversationHistory";
import { ConversationHistoryItemResponseData } from "~/types/response/history";
import Pagination from "~/components/base/Pagination";
import Loading from "~/components/animations/Loading";
import { HistoryConfig } from "~/constants/configs";

const ConversationHistoryPage = () => {
	const t = useTranslations("history");

	const { DEFAULT_PAGE, DEFAULT_LIMIT } = HistoryConfig;

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>(undefined);
	const [history, setHistory] = useState<ConversationHistoryItemResponseData[]>([]);
	const [pageState, setPageState] = useState<{
		currentPage: number;
		lastPage: number;
		from: number;
		to: number;
		total: number;
	}>({
		currentPage: DEFAULT_PAGE,
		lastPage: 1,
		from: 0,
		to: 0,
		total: 0,
	});

	const onChangePage = (page: number) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set("page", page.toString());
		const search = current.toString();
		const query = search ? `?${search}` : "";
		router.push(`${pathname}${query}`);
	};

	const requestGetHistory = useCallback(() => {
		const page = searchParams.get("page") ?? DEFAULT_PAGE;
		const limit = searchParams.get("limit") ?? DEFAULT_LIMIT;
		startTransition(async () => {
			try {
				const res = await getConversationHistory(limit, page);
				if (res) {
					setError(undefined);
					setHistory(res.items);
					setPageState({
						currentPage: res.current_page,
						lastPage: res.last_page,
						from: res.from,
						to: res.to,
						total: res.total,
					});
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		});
	}, [searchParams]);

	useEffect(() => {
		if (searchParams) requestGetHistory();
	}, [searchParams, requestGetHistory]);

	const renderHistoryItem = useCallback((item: ConversationHistoryItemResponseData) => {
		return <>{JSON.stringify(item)}</>;
	}, []);

	const { currentPage, lastPage, from, to, total } = pageState;
	return (
		<div className="w-full h-full flex flex-col gap-4 py-2">
			<div className="flex justify-between px-2">
				{from !== to && total > 1 ? (
					<span className="inline-flex font-semibold text-gray-500 items-center ">
						{t("countDisplay", { from, to, total })}
					</span>
				) : (
					<div />
				)}
				<Pagination size={lastPage} initPage={currentPage} onChange={onChangePage} />
			</div>
			{pending ? (
				<Loading />
			) : error ? (
				<div className="text-red-500 text-center p-4">{error}</div>
			) : (
				history.map(renderHistoryItem)
			)}
		</div>
	);
};

export default ConversationHistoryPage;
