import { ArrowTrendingUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
	value: number;
	onChange: (value: number) => void;
}

const SelectSpeed = (props: Props) => {
	const { value, onChange } = props;
	const options = [
		{ value: 0.25, label: "0.25x" },
		{ value: 0.5, label: "0.5x" },
		{ value: 0.75, label: "0.75x" },
		{ value: 1, label: "Bình thường" },
		{ value: 1.25, label: "1.25x" },
		{ value: 1.5, label: "1.5x" },
		{ value: 1.75, label: "1.75x" },
		{ value: 2, label: "2x" },
		{ value: 2.25, label: "2.25x" },
		{ value: 2.5, label: "2.5x" },
		{ value: 2.75, label: "2.75x" },
		{ value: 3, label: "3x" },
		{ value: 3.25, label: "3.25x" },
		{ value: 3.5, label: "3.5x" },
		{ value: 3.75, label: "3.75x" },
		{ value: 4, label: "4x" },
	];

	const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(parseFloat(e.target.value));
	};

	return (
		<>
			<select
				name="speed"
				id="speed"
				value={value || 1}
				onChange={onSelectChange}
				style={{ appearance: "none" }}
				className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-select rounded-none rounded-l-full text-base px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ps-12 pe-12"
			>
				<option value={0} disabled>
					Chọn tốc độ
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
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
