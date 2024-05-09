"use client";

import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";

const FileInput = () => {
	const { input, onChangeInput, config } = useConvertToSpeech();

	const { fileAccept = [] } = config;

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onChangeInput(e.target.files[0]);
		}
	};

	const onClickClearFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onChangeInput(null);
		e.stopPropagation();
	};

	const renderFile = () => {
		const file = input.file as File;
		if (!file)
			return (
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<CloudArrowUpIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
						<span className="font-semibold">Nhấp để tải lên</span>
						<br />
					</p>
					<div className="text-xs text-gray-500 dark:text-gray-400">{fileAccept.join(", ")} được hỗ trợ</div>
				</div>
			);
		return (
			<div className="flex items-center md:min-w-[200px] space-x-3 max-w-sm md:max-w-sm px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div>
					<DocumentIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
				</div>
				<div className="truncate">
					<div className="text-nomal text-gray-700 dark:text-gray-300 truncate">{file.name}</div>
					<div className="text-sm font-thin text-gray-500 dark:text-gray-400">{file.size} bytes</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full h-full">
			<div className="relative flex items-center justify-center w-full p-6">
				<label className="flex flex-col items-center rounded-lg justify-center w-full h-64 cursor-pointer border-2 border-dashed dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
					{!!input.file && (
						<button
							onClick={onClickClearFile}
							className="absolute right-8 top-8 cursor-pointer inline-flex justify-center p-2 text-gray-500 rounded-full"
						>
							<XMarkIcon className="h-5 w-5" />
						</button>
					)}
					{renderFile()}
					<input type="file" accept={fileAccept.join(",")} onChange={handleTextChange} className="hidden" />
				</label>
			</div>
		</div>
	);
};

export default FileInput;
