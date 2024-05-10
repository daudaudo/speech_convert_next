"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const CTTOutput = () => {
	const { output, error, clearError } = useConvertToText();
	const displayOutput = output[0];

	if (error) {
		return (
			<div className="text-red-500 p-4 text-sm">
				<div className="flex flex-row gap-2 items-center">
					<button
						onClick={clearError}
						className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
					>
						<XCircleIcon className="h-4 w-4" />
					</button>
					<span>Lỗi: {error}</span>
				</div>
			</div>
		);
	}

	if (!displayOutput?.text || !displayOutput?.segments) return null;

	return (
		<textarea
			readOnly
			value={displayOutput.text}
			className="scrollbar-thin w-full pb-6 pt-1 resize-none overflow-y-auto md:h-full min-h-[238px] px-0 text-sm text-gray-900 bg-gray-100 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none"
		/>
	);
};

export default CTTOutput;
