"use client";

import React from "react";
import { Option as MuiOption, Select as MuiSelect } from "@material-tailwind/react";

type SelectOption<T> = {
	value: T;
	label: string;
};

interface SelectProps<T> {
	options: SelectOption<T>[];
	value?: T;
	onChange: (value: T) => void;
	label?: string;
}

const Select = <T,>({ options, value, onChange, label }: SelectProps<T>): JSX.Element => {
	const handleChange = (value?: string) => {
		onChange(value as T);
	};

	const renderSelectedOptions = () => (
		<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
			{options.find((opt) => opt.value === value)?.label}
		</span>
	);

	return (
		<MuiSelect
			size="md"
			label={label}
			value={value as unknown as string}
			selected={renderSelectedOptions}
			onChange={handleChange}
			// className="block w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			{options.map((opt) => (
				<MuiOption key={opt.value as unknown as string} value={opt.value as unknown as string}>
					<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
						{opt.label}
					</span>
				</MuiOption>
			))}
		</MuiSelect>
	);
};

export default Select;
