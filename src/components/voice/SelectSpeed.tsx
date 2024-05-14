import { ArrowTrendingUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
	value: number;
	onChange: (value: number) => void;
}

const SelectSpeed = (props: Props) => {
	const { value, onChange } = props;
	const options = [
		{ value: 0.25, label: "0.25" },
		{ value: 0.5, label: "0.5" },
		{ value: 0.75, label: "0.75" },
		{ value: 1, label: "1.0" },
		{ value: 1.25, label: "1.25" },
		{ value: 1.5, label: "1.5" },
		{ value: 1.75, label: "1.75" },
		{ value: 2, label: "2.0" },
		{ value: 2.5, label: "2.5" },
		{ value: 3, label: "3.0" },
		{ value: 3.5, label: "3.5" },
		{ value: 4, label: "4.0" },
	];

	const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(parseFloat(e.target.value));
	};

	return (
		<>
			<select
				name="speed"
				value={value || 1}
				onChange={onSelectChange}
				style={{ appearance: "none" }}
				className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-select rounded-none md:rounded-l-full text-xs md:text-base px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ps-12 pe-12"
			>
				<option value={0} disabled>
					Chọn tốc độ
				</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="relative md:before:content-['Tốc độ:'] before:text-red-500 before:content-none"
					>
						{option.label}
					</option>
				))}
			</select>
			<span className="absolute inset-y-0 start-0 flex items-center pointer-events-none px-3.5">
				<ArrowTrendingUpIcon className="h-4 w-4 text-gray-900 dark:text-white" />
			</span>
			<span className="absolute inset-y-0 end-0 flex items-center pointer-events-none px-3.5">
				<ChevronDownIcon className="h-4 w-4 text-gray-900 dark:text-white" />
			</span>
		</>
	);
};

export default SelectSpeed;
