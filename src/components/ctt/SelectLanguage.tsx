"use client";

import React, { useMemo } from "react";
import { Option, Select } from "@material-tailwind/react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";
import { LanguageCode } from "~/enums/language";

const SelectLanguage = () => {
	const { setLanguage, language } = useConvertToText();

	const options = useMemo(() => {
		const keys = Object.keys(LanguageCode) as (keyof typeof LanguageCode)[];
		return keys.map((key) => {
			return {
				value: LanguageCode[key],
				label: key,
			};
		});
	}, []);

	const onSelectChange = (value?: string) => {
		if (!value) return;
		setLanguage(value as LanguageCode);
	};

	const renderSelectOptions = () => {
		const selected = options.find((option) => option.value === language);
		return (
			<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
				{selected?.label}
			</span>
		);
	};

	return (
		<div className="min-w-[200px]">
			<Select size="md" variant="static" value={language} selected={renderSelectOptions} onChange={onSelectChange}>
				{options.map(({ value, label }) => (
					<Option key={value} value={value}>
						<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
							{label}
						</span>
					</Option>
				))}
			</Select>
		</div>
	);
};

export default SelectLanguage;
