"use client";

import React, { useCallback } from "react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { HistoryType } from "~/types/HistoryTypes";
import withSuspense from "~/hocs/withSuspense";

const NavBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const onSelect = (type: HistoryType) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set("type", type);
		const search = current.toString();
		const query = search ? `?${search}` : "";
		router.push(`${pathname}${query}`);
	};

	const renderNavButton = useCallback(
		(itemType: HistoryType, label: string) => {
			const isActive = itemType === searchParams.get("type");
			return (
				<Button
					onClick={() => onSelect(itemType)}
					className={`${isActive ? "bg-primary-200 dark:bg-primary-700" : ""} text-gray-700 dark:text-gray-200`}
				>
					{label}
				</Button>
			);
		},
		[searchParams],
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

const HistoryNavBar = withSuspense(NavBar);

export default HistoryNavBar;
