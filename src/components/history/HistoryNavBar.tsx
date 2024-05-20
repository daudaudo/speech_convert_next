"use client";

import React, { useCallback } from "react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useHistory } from "~/contexts/HistoryContext";
import { HistoryType } from "~/types/HistoryTypes";

const HistoryNavBar = () => {
	const { type, onChangeType } = useHistory();

	const renderNavButton = useCallback(
		(itemType: HistoryType, label: string) => {
			const isActive = itemType === type;
			return (
				<Button
					onClick={() => onChangeType(itemType)}
					className={`${isActive ? "bg-primary-200" : ""} text-gray-700 dark:text-gray-200`}
				>
					{label}
				</Button>
			);
		},
		[onChangeType, type],
	);

	return (
		<div className="w-full px-4 border-b-2">
			<div className="rounded-lg max-w-96 min-w-80 mx-auto">
				<ButtonGroup fullWidth variant="text" size="sm" className="divide-x-0 text-gray-800 dark:text-gray-100">
					{renderNavButton("cts", "Chuyển đổi thành Âm thanh")}
					{renderNavButton("ctt", "Chuyển đổi thành Văn bản")}
				</ButtonGroup>
			</div>
		</div>
	);
};

export default HistoryNavBar;
