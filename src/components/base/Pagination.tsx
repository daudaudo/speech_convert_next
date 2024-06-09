"use client";

import React, { useMemo, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import SvgIcon from "~/components/icon/SvgIcon";

interface Props {
	initPage?: number;
	size: number;
	onChange: (page: number) => void;
	delta?: number; // Number of pages to show around the current page
	alwayShowFirstAndLast?: boolean;
}

const Pagination = (props: Props) => {
	const t = useTranslations("components.Pagination");
	const { initPage = 1, size, onChange, delta = 1, alwayShowFirstAndLast = true } = props;
	const [active, setActive] = useState<number>(initPage);

	const changeActive = (act: number) => {
		setActive(act);
		onChange(act);
	};

	const prev = () => {
		if (active <= 1) return;
		changeActive(active - 1);
	};

	const next = () => {
		if (active >= size) return;
		changeActive(active + 1);
	};

	const pagesData = useMemo(() => {
		const pageNumbers: number[] = [];
		if (alwayShowFirstAndLast) pageNumbers.push(1);
		for (
			let i = Math.max(active - delta, alwayShowFirstAndLast ? 2 : 1);
			i <= Math.min(active + delta, alwayShowFirstAndLast ? size - 1 : size);
			i++
		) {
			pageNumbers.push(i);
		}
		if (alwayShowFirstAndLast && size > 1) {
			pageNumbers.push(size);
		}
		return [...new Set(pageNumbers)];
	}, [active, size]);

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100 px-2"
				onClick={prev}
				disabled={active === 1}
			>
				<SvgIcon name="arrow-left" type="solid" width={16} height={16} />
				<span className="hidden sm:block">{t("prev")}</span>
			</Button>
			<div className="flex items-center gap-2">
				{pagesData.map((page, index) => (
					<React.Fragment key={page}>
						{index > 0 && pagesData[index - 1] + 1 < page && (
							<span className="px-2 hidden sm:block font-bold text-gray-800 dark:text-gray-100">...</span>
						)}
						<IconButton
							size="sm"
							variant="text"
							onClick={() => {
								changeActive(page);
							}}
							className={`rounded-full font-bold text-gray-800 dark:text-gray-100 ${active === page ? "bg-primary-500" : ""}`}
						>
							{page}
						</IconButton>
					</React.Fragment>
				))}
			</div>
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100 px-2"
				onClick={next}
				disabled={active === size}
			>
				<span className="hidden sm:block">{t("next")}</span>
				<SvgIcon name="arrow-right" type="solid" width={16} height={16} />
			</Button>
		</div>
	);
};

export default Pagination;
