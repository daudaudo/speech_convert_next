"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, Textarea } from "@material-tailwind/react";
import getConversationHistory from "~/actions/getConversationHistory";
import { ConversationHistoryItemResponseData } from "~/types/response/history";
import Pagination from "~/components/base/Pagination";
import Loading from "~/components/animations/Loading";
import { HistoryConfig } from "~/constants/configs";
import SvgIcon from "~/components/icon/SvgIcon";
import formatDate from "~/utils/date";

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
		const { _id, partials, created_at, audio_url } = item;
		return (
			<Card key={_id} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-md flex flex-row gap-2">
				<div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800 inline-flex items-center justify-center text-primary-800 dark:text-primary-200">
					<SvgIcon name="messages" type="solid" width={24} height={24} />
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<div className="inline-flex justify-between">
						<div />
						<div className="inline-flex item-center text-xs text-gray-800 dark:text-gray-100">
							{formatDate(created_at)}
						</div>
					</div>
					<div className="p-2 flex flex-col gap-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-100">
						{partials.map(({ name, text, audio_url }) => {
							return (
								<div key={audio_url.slice(-10)} className="w-full flex flex-row">
									<span className="p-2 w-24 font-semibold text-gray-800 dark:text-gray-100">{name}</span>
									<Textarea readOnly value={text} className="text-gray-800 dark:text-gray-100 min-h-0" />
								</div>
							);
						})}
					</div>
					<div className="flex flex-row gap-2">
						<div className="transform scale-y-[-1] px-4 flex items-center">
							<SvgIcon type="solid" name="share" width={24} height={24} />
						</div>
						<div className="flex-1 p-2 bg-gray-300 dark:bg-gray-600 rounded-lg">
							<div className="flex flex-row items-center gap-2">
								<audio controls className="w-full bg-gray-300 dark:bg-gray-600" controlsList="nodownload">
									<source src={audio_url} type="audio/mpeg" />
									Your browser does not support the audio element.
								</audio>
								<a href={audio_url} download={audio_url} className="text-gray-800 dark:text-gray-100">
									<SvgIcon name="arrow-down-to-bracket" width={24} height={24} className="text-black dark:text-white" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</Card>
		);
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
