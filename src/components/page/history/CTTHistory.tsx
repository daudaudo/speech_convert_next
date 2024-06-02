"use client";

import { Card } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";
import Pagination from "~/components/base/Pagination";
import SvgIcon from "~/components/icon/SvgIcon";
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

	const renderHistoryItem = (h: CTTHistoryType) => {
		const { _id, text, language, input_stream_url, model, created_at } = h;
		return (
			<Card key={_id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-row gap-2">
				<div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800 inline-flex items-center justify-center text-primary-800 dark:text-primary-200">
					<SvgIcon name="text" type="outline" width={24} height={24} />
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<div className="inline-flex justify-between">
						<div className="flex-1 flex gap-2 items-center">
							<span className="bg-pink-100 px-3 py-1 rounded-lg text-xs text-gray-800">{language}</span>
							<span className="bg-green-100 px-3 py-1 rounded-lg text-xs text-gray-800">{model}</span>
						</div>
						<div className="inline-flex item-center text-xs text-gray-800 dark:text-gray-100">
							{formatDate(created_at)}
						</div>
					</div>

					<div className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg">
						<div className="flex flex-row items-center gap-2">
							<audio controls className="w-full bg-gray-300 dark:bg-gray-600" controlsList="nodownload">
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
