"use client";

import React, { FC } from "react";
import SvgIcon from "~/components/icon/SvgIcon";

interface SearchInputProps {
	placeholder?: string;
	value?: string;
	onSearchChange?: (text: string) => void;
	autoFocus?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
	placeholder = "Search...",
	value,
	onSearchChange,
	autoFocus,
}: SearchInputProps) => {
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
				className="block w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
			/>
		</div>
	);
};

export default SearchInput;