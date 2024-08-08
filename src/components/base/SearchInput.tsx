"use client";

import { useTranslations } from "next-intl";
import React, { FC } from "react";
import SvgIcon from "~/components/icon/SvgIcon";

interface SearchInputProps {
	placeholder?: string;
	value?: string;
	onSearchChange?: (text: string) => void;
	autoFocus?: boolean;
}

const SearchInput: FC<SearchInputProps> = (props: SearchInputProps) => {
	const t = useTranslations("components.searchInput");
	const { placeholder = t("placeholder"), value, onSearchChange, autoFocus } = props;
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearchChange?.(e.target.value);
	};

	return (
		<div className="relative w-full">
			<span className="absolute inset-y-0 left-0 flex items-center pl-3">
				<SvgIcon name="search" type="solid" width={20} height={20} />
			</span>
			<input
				type="text"
				className="block h-10 w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-200 dark:focus:ring-primary-600 focus:ring-opacity-50"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
			/>
		</div>
	);
};

export default SearchInput;
