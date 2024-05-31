"use client";

import { ArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Card, IconButton } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";
import Pagination from "~/components/base/Pagination";
import type { CTTHistoryType } from "~/types/HistoryTypes";
import formatDate from "~/utils/date";

interface Props {
	history: CTTHistoryType[];
	currentPage: number;
	lastPage: number;
	onChangePage: (page: number) => void;
	from: number;
	to: number;
	total: number;
}

const CTTListHistory = (props: Props) => {
	const { history, currentPage, lastPage, onChangePage, from, to, total } = props;
	const t = useTranslations("history");

	const deleteHistory = () => {};

	const renderHistoryItem = (h: CTTHistoryType) => {
		const { _id, text, language, input_stream_url, model, created_at } = h;
		return (
			<Card key={_id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col gap-2">
				<div className="inline-flex">
					<div className="flex-1 flex gap-2 items-center">
						<span className="bg-pink-100 px-3 py-1 rounded-full text-gray-800">{language}</span>
						<span className="bg-green-100 px-3 py-1 rounded-full text-gray-800">{model}</span>
					</div>
					<IconButton variant="text" onClick={deleteHistory} className="rounded-full text-gray-800 dark:text-gray-100">
						<XMarkIcon className="h-5 w-5" />
					</IconButton>
				</div>
				<div className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-100">{text}</div>
				<div className="w-full flex justify-center text-primary-500">
					<ArrowDownIcon className="h-5 w-5" />
				</div>
				<div className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg">
					<div className="flex flex-row items-center gap-2">
						<audio controls className="w-full bg-gray-300 dark:bg-gray-600" controlsList="nodownload">
							<source src={input_stream_url} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
					</div>
				</div>
				<div className="flex w-full justify-end text-xs text-gray-800 dark:text-gray-100">{formatDate(created_at)}</div>
			</Card>
		);
	};

	return (
		<div className="w-full h-full flex flex-col gap-4 py-2">
			<div className="flex justify-between items-center py-2">
				{from !== to && total > 1 ? (
					<span className="inline-flex text-gray-600 dark:text-gray-300 items-center ">
						{t("countDisplay", { from, to, total })}
					</span>
				) : (
					<div />
				)}
				<Pagination size={lastPage} initPage={currentPage} onChange={onChangePage} />
			</div>
			{history.map(renderHistoryItem)}
		</div>
	);
};

export default CTTListHistory;
