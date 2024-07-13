"use client";

import React from "react";
import { Option, Select } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { LanguageCode } from "~/enums/language";
import { Languages } from "~/constants/language";

interface Props {
	language: LanguageCode;
	setLanguage: (language: LanguageCode) => void;
	options: LanguageCode[];
}

const LanguageSelect = ({ setLanguage, language, options = [] }: Props) => {
	const t = useTranslations("ctt");
	const onSelectChange = (value?: string) => {
		if (!value) return;
		setLanguage(value as LanguageCode);
	};

	const renderSelectedOptions = () => {
		return (
			<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
				{Languages[language].name}
			</span>
		);
	};

	return (
		<Select
			size="md"
			label={t("selectLanguegeLabel")}
			value={language}
			selected={renderSelectedOptions}
			onChange={onSelectChange}
		>
			{options.map((lang: LanguageCode) => (
				<Option key={lang} value={lang}>
					<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
						{Languages[lang].name}
					</span>
				</Option>
			))}
		</Select>
	);
};

export default LanguageSelect;
