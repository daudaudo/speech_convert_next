"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";

interface Props {
	initPage?: number;
	size: number;
	onChange: (page: number) => void;
}

const Pagination = (props: Props) => {
	const { initPage = 1, size, onChange } = props;
	const [active, setActive] = useState<number>(initPage);

	const pagesData = useMemo(() => {
		const rs = [];
		for (let i = 0; i < size; i++) {
			rs.push({ key: `pagination-${i}`, value: i + 1 });
		}
		return rs;
	}, []);

	if (typeof size !== "number" || size <= 1) return null;

	const changeActive = (act: number) => {
		setActive(act);
		onChange(act);
	};

	const prev = () => {
		if (active === 1) return;
		changeActive(active - 1);
	};

	const next = () => {
		if (active === size) return;
		changeActive(active + 1);
	};

	return (
		<div className="flex items-center gap-4">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100"
				onClick={prev}
				disabled={active === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
				Trước
			</Button>
			<div className="flex items-center gap-2">
				{pagesData.map(({ key, value }) => (
					<IconButton
						key={key}
						variant="text"
						onClick={() => {
							changeActive(value);
						}}
						className={`rounded-full font-bold text-gray-800 dark:text-gray-100 ${active === value ? "bg-primary-500" : ""}`}
					>
						{value}
					</IconButton>
				))}
			</div>
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100"
				onClick={next}
				disabled={active === size}
			>
				Tiếp
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default Pagination;