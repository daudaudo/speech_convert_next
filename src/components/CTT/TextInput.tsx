"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const CTTTextInput = () => {
	const { input, changeInput, config, error, clearError } = useConvertToText();

	const { maxTextLength } = config;

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeInput(e.target.value);
	};

	const onClearText = () => {
		changeInput("");
	};

	return (
		<div className="w-full h-full">
			{error && (
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
			)}
			<textarea
				placeholder="Nhập văn bản cần dịch"
				required
				maxLength={maxTextLength}
				onChange={handleTextChange}
				value={input.text}
				className={`${error ? "hidden" : ""} w-full pl-4 pr-2 resize-none overflow-y-auto h-full min-h-[210px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3`}
			/>
			<div
				className={`${error ? "hidden" : ""} absolute bottom-[10px] right-3 text-right text-xs font-thin dark:text-gray-300 flex flex-row space-x-4 items-center`}
			>
				<div>
					{input.text.length} / {maxTextLength}
				</div>
				<button
					onClick={onClearText}
					className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 text-red-500 hover:text-red-600 disabled:text-red-500 dark:text-red-400 dark:hover:text-red-500 dark:disabled:text-red-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-400 inline-flex items-center"
				>
					<span>Xoá văn bản</span>
				</button>
			</div>
		</div>
	);
};

export default CTTTextInput;
