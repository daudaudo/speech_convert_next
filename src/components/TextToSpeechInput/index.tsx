"use client";

import { LanguageIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useTextToSpeech } from "~/contexts/TextToSpeechContext";

// Để tạm ở đây, sau này sẽ chuyển sang dùng biến từ context
const maxTextLength = 200;
const TextToSpeechInput = () => {
	const { text, onChangeText } = useTextToSpeech();

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChangeText(e.target.value);
	};

	const onClearText = () => {
		onChangeText("");
	};

	return (
		<div className="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 relative w-full flex-1">
			<div className="h-full px-4 py-5 sm:p-6 !p-0">
				<div className="relative px-0 pb-6 rounded-lg h-full">
					<div className="flex flex-col h-full wrapper">
						<div className="relative w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-2">
							<ul className="flex items-center min-w-0">
								<li className="min-w-0">
									<p className="relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
										<LanguageIcon className="h-4 w-4" />
										Văn bản nhập vào
									</p>
								</li>
							</ul>
						</div>
						<div className="flex flex-col h-full">
							<div className="flex flex-1 flex-col justify-between">
								<textarea
									id="text-to-speech-input"
									placeholder="Nhập văn bản cần chuyển đổi"
									required
									maxLength={maxTextLength}
									onChange={handleTextChange}
									value={text}
									className="scrollbar-thin w-full md:pl-4 md:pr-2 resize-none overflow-y-auto h-full min-h-[210px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3"
								/>
							</div>
						</div>
					</div>
					<div className="absolute bottom-[10px] right-3 text-right text-xs font-thin dark:text-gray-300 flex flex-row space-x-4 items-center">
						<div>
							{text.length} / {maxTextLength}
						</div>
						<button
							type="button"
							onClick={onClearText}
							className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 text-red-500 hover:text-red-600 disabled:text-red-500 dark:text-red-400 dark:hover:text-red-500 dark:disabled:text-red-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-400 inline-flex items-center"
						>
							<span>Xoá văn bản</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TextToSpeechInput;
