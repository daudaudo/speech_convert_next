"use client";

import React, { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@material-tailwind/react";
import LoadingData from "~/components/animations/LoadingData";
import withSuspense from "~/hocs/withSuspense";
import Pagination from "~/components/base/Pagination";
import SvgIcon from "~/components/icon/SvgIcon";
import formatDate from "~/utils/date";
import { TextHistoryItemResponseData } from "~/types/response/history";
import { HistoryConfig } from "~/constants/configs";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { historyActions } from "~/store/slices/history";

const HistoryPage = () => {
	const dispatch = useAppDispatch();
	const { items, loading, error, current_page, last_page, total, from, to } = useAppSelector(
		(state) => state.history.transcription,
	);
	const t = useTranslations("history");

	const { DEFAULT_PAGE, DEFAULT_LIMIT } = HistoryConfig;

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

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
		dispatch(historyActions.fetchTextHistory({ limit, page }));
	}, [searchParams]);

	useEffect(() => {
		if (searchParams) requestGetHistory();
	}, [searchParams, requestGetHistory]);

	const renderHistoryItem = useCallback((item: TextHistoryItemResponseData) => {
		const { _id, provider, text, language, input_stream_url, model, created_at } = item;
		return (
			<Card key={_id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-row gap-2">
				<div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800 inline-flex items-center justify-center text-primary-800 dark:text-primary-200">
					<SvgIcon name="text" type="outline" width={24} height={24} />
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<div className="inline-flex justify-between">
						<div className="flex-1 flex gap-2 items-center">
							<span className="bg-orange-100 px-3 py-1 rounded-lg text-xs text-gray-800">{provider}</span>
							<span className="bg-pink-100 px-3 py-1 rounded-lg text-xs text-gray-800">{language}</span>
							<span className="bg-green-100 px-3 py-1 rounded-lg text-xs text-gray-800">{model}</span>
						</div>
						<div className="inline-flex item-center text-xs text-gray-800 dark:text-gray-100">
							{formatDate(created_at)}
						</div>
					</div>

					<div className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg">
						<div className="flex flex-row items-center gap-2">
							<audio controls className="w-full bg-gray-300 dark:bg-gray-600">
								<source src={input_stream_url} type="audio/mpeg" />
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
					<div className="flex flex-row gap-2">
						<div className="transform scale-y-[-1] px-4 flex items-center">
							<SvgIcon type="solid" name="share" width={24} height={24} />
						</div>
						<div className="flex-1 p-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-100">
							{text}
						</div>
					</div>
				</div>
			</Card>
		);
	}, []);

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
				<Pagination size={last_page} initPage={current_page} onChange={onChangePage} />
			</div>
			{loading ? (
				<LoadingData />
			) : error ? (
				<div className="text-red-500 text-center p-4">{error}</div>
			) : (
				items.map(renderHistoryItem)
			)}
		</div>
	);
};

const TextHistoryPage = withSuspense(HistoryPage, <LoadingData />);

export default TextHistoryPage;
