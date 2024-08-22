"use client";

import React, { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, Textarea } from "@material-tailwind/react";
import { ConversationHistoryItemResponseData } from "~/types/response/history";
import Pagination from "~/components/base/Pagination";
import LoadingData from "~/components/animations/LoadingData";
import { HistoryConfig } from "~/constants/configs";
import SvgIcon from "~/components/icon/SvgIcon";
import formatDate from "~/utils/date";
import withSuspense from "~/hocs/withSuspense";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { historyActions } from "~/store/slices/history";

const HistoryPage = () => {
	const dispatch = useAppDispatch();
	const { items, loading, error, current_page, last_page, total, from, to } = useAppSelector(
		(state) => state.history.conversation,
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
		dispatch(historyActions.fetchConversationHistory({ limit, page }));
	}, [searchParams]);

	useEffect(() => {
		if (searchParams) requestGetHistory();
	}, [searchParams, requestGetHistory]);

	const renderHistoryItem = useCallback((item: ConversationHistoryItemResponseData) => {
		const { _id, provider, partials, created_at, audio_url } = item;
		return (
			<Card key={_id} className="p-4 bg-gray-200 dark:bg-gray-800 rounded-md flex flex-row gap-2">
				<div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800 inline-flex items-center justify-center text-primary-800 dark:text-primary-200">
					<SvgIcon name="messages" type="solid" width={24} height={24} />
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<div className="p-2 flex flex-col gap-4 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-100">
						{partials.map(({ name, text, silent, voice, audio_url }) => {
							return (
								<div key={audio_url.slice(-10)} className="w-full grid grid-cols-1 md:grid-cols-12 gap-2">
									<span className="md:col-span-2 md:p-2 font-semibold text-gray-800 dark:text-gray-100">{name}</span>
									<span className="md:col-span-10">
										<Textarea
											readOnly
											value={text}
											label={`${voice} - ${provider}${silent ? ` +${silent}s` : ""}`}
											labelProps={{ className: "text-pink-200" }}
											className="!min-h-0 w-full text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 !cursor-default"
										/>
									</span>
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
								<audio controls className="w-full bg-gray-300 dark:bg-gray-600">
									<source src={audio_url} type="audio/mpeg" />
									Your browser does not support the audio element.
								</audio>
								<a href={audio_url} download={audio_url} className="text-gray-800 dark:text-gray-100">
									<SvgIcon name="arrow-down-to-bracket" width={24} height={24} className="text-black dark:text-white" />
								</a>
							</div>
						</div>
					</div>
					<div className="inline-flex justify-between">
						<div />
						<div className="inline-flex item-center text-xs text-gray-800 dark:text-gray-100">
							{formatDate(created_at)}
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

const ConversationHistoryPage = withSuspense(HistoryPage, <LoadingData />);

export default ConversationHistoryPage;
