"use client";

import React from "react";
import { Option, Select } from "@material-tailwind/react";
import { LanguageCode } from "~/enums/language";
import { Languages, supportedLanguages } from "~/constants/language";

interface Props {
	language: LanguageCode;
	setLanguage: (language: LanguageCode) => void;
}

const LanguageSelect = ({ setLanguage, language }: Props) => {
	const onSelectChange = (value?: string) => {
		if (!value) return;
		setLanguage(value as LanguageCode);
	};

	const renderSelectedOptions = () => {
		return (
			<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 mb-3">
				{Languages[language].name}
			</span>
		);
	};

	return (
		<Select size="md" variant="static" value={language} selected={renderSelectedOptions} onChange={onSelectChange}>
			{supportedLanguages.map((lang: LanguageCode) => (
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
