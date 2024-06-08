"use client";

import React, { useMemo, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import SvgIcon from "../icon/SvgIcon";

interface Props {
	initPage?: number;
	size: number;
	onChange: (page: number) => void;
}

const Pagination = (props: Props) => {
	const t = useTranslations("components.Pagination");
	const { initPage = 1, size, onChange } = props;
	const [active, setActive] = useState<number>(initPage);

	const pagesData = useMemo(() => {
		const rs = [];
		for (let i = 0; i < size; i++) {
			rs.push({ key: `pagination-${i}`, value: i + 1 });
		}
		return rs;
	}, []);

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

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100 px-2"
				onClick={prev}
				disabled={active === 1}
			>
				<SvgIcon name="arrow-left" type="solid" width={16} height={16} />
				{t("prev")}
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
				className="flex items-center gap-2 rounded-full font-bold text-gray-800 dark:text-gray-100 px-2"
				onClick={next}
				disabled={active === size}
			>
				{t("next")}
				<SvgIcon name="arrow-right" type="solid" width={16} height={16} />
			</Button>
		</div>
	);
};

export default Pagination;
