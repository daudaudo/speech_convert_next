"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { OpenAITTSModel } from "~/enums/openAi";
import { CTSModel } from "~/types/CTSTypes";
import SvgIcon from "../icon/SvgIcon";

interface ModelSelectProps {
	value: CTSModel;
	onChange: (value: CTSModel) => void;
}

const ModelSelect: React.FC<ModelSelectProps> = ({ value, onChange }) => {
	const t = useTranslations("cts.voice");

	const options = [
		{ value: OpenAITTSModel.TTS1, label: t("highQuality") },
		{ value: OpenAITTSModel.TTS1HD, label: t("HDQuality") },
	];

	return (
		<div className="relative inline-block text-gray-700 dark:text-gray-300">
			<select
				value={value}
				onChange={(e) => onChange(e.target.value as CTSModel)}
				className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 dark:placeholder-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:shadow-outline focus:outline-none focus:border-primary-500 dark:focus:border-primary-400"
			>
				<option disabled>{t("selectQuality")}</option>
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

export default ModelSelect;
