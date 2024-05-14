"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const CTTOutput = () => {
	const { output, error, clearError } = useConvertToText();
	const [, copyToClipboard] = useCopyToClipboard();
	const displayOutput = output[0];

	const onCopyOutput = () => {
		if (displayOutput?.text) {
			copyToClipboard("displayOutput.text");
			// .then(() => {
			// 	console.log("Copied!", {});
			// })
			// .catch((error) => {
			// 	console.error("Failed to copy!", error);
			// });
		}
	};

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
		<div className="flex flex-col h-full max-h-full md:pt-2 px-4 pl-8 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">
			<div className="flex-1 md:pl-4">
				<div className="relative w-full h-full">
					<textarea
						readOnly
						value={displayOutput.text}
						className="w-full pb-6 pt-1 resize-none overflow-y-auto md:h-full min-h-[238px] px-0 text-sm text-gray-900 bg-gray-100 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none"
					/>
				</div>
			</div>
			{displayOutput.text && (
				<button onClick={onCopyOutput} className="shrink-0 pb-1 flex justify-end">
					<ClipboardDocumentIcon className="h-6 w-6" />
				</button>
			)}
		</div>
	);
};

export default CTTOutput;
