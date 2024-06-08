"use client";

import React from "react";
import { useTranslations } from "next-intl";
import SvgIcon from "~/components/icon/SvgIcon";

const options: { value: number; label: string }[] = [
	{ value: 0.25, label: "0.25x" },
	{ value: 0.5, label: "0.5x" },
	{ value: 0.75, label: "0.75x" },
	{ value: 1, label: "1.0x" },
	{ value: 1.25, label: "1.25x" },
	{ value: 1.5, label: "1.5x" },
	{ value: 1.75, label: "1.75x" },
	{ value: 2, label: "2.0x" },
	{ value: 2.5, label: "2.5x" },
	{ value: 3, label: "3.0x" },
	{ value: 3.5, label: "3.5x" },
	{ value: 4, label: "4.0x" },
];

interface SpeedSelectProps {
	value: number;
	onChange: (value: number) => void;
}

const SpeedSelect: React.FC<SpeedSelectProps> = ({ value, onChange }) => {
	const t = useTranslations("cts.voice");
	return (
		<div className="relative inline-block text-gray-700 dark:text-gray-300">
			<select
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 dark:placeholder-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:shadow-outline focus:outline-none focus:border-primary-500 dark:focus:border-primary-400"
			>
				<option disabled>{t("selectSpeed")}</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
					>
						{option.label}
					</option>
				))}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
				<SvgIcon name="chevron-down" type="solid" width={16} height={16} />
			</div>
		</div>
	);
};

export default SpeedSelect;
