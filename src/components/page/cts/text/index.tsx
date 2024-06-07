"use client";

import React, { useCallback } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/VoiceSelect";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import { CTSSpeed } from "~/types/CTSTypes";

const TextToSpeechPage = () => {
	const t = useTranslations("cts");
	const {
		input,
		changeInput,
		config,
		error,
		clearError,
		pending,
		requestCreateSpeech,
		validate,
		speed,
		setSpeed,
		model,
		setModel,
		voiceId,
		setVoiceId,
	} = useConvertToSpeech();

	const onChangeSpeed = useCallback(
		(speed: number) => {
			setSpeed(speed as CTSSpeed);
		},
		[setSpeed],
	);

	const { maxTextLength } = config;
	const textError = error?.text;

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeInput(e.target.value);
	};

	const onClearText = () => {
		changeInput("");
	};

	return (
		<div className="w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<SpeedSelect value={speed} onChange={onChangeSpeed} />
					<ModelSelect value={model} onChange={setModel} />
					<VoiceSelect value={voiceId} onChange={setVoiceId} />
				</span>
			</div>
			<div className="relative flex-1 w-full">
				{textError && (
					<div className="text-red-500 p-4 text-sm">
						<div className="flex flex-row gap-2 items-center">
							<button
								onClick={clearError}
								className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
							>
								<XCircleIcon className="h-4 w-4" />
							</button>
							<span>{t("textError", { error: textError })}</span>
						</div>
					</div>
				)}
				<textarea
					autoFocus
					placeholder={t("textPlaceholder")}
					required
					maxLength={maxTextLength}
					onChange={handleTextChange}
					value={input.text}
					className={`${textError ? "hidden" : ""} w-full pt-8 pl-4 pr-2 resize-none overflow-y-auto h-full min-h-[210px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3`}
				/>
				<div
					className={`${textError || !input.text ? "hidden" : ""} absolute top-[10px] right-3 text-right text-xs font-thin dark:text-gray-300 flex flex-row space-x-4 items-center`}
				>
					<span>
						{input.text.length} / {maxTextLength}
					</span>
					<button
						onClick={onClearText}
						disabled={!input.text}
						className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 text-red-500 hover:text-red-600 disabled:text-red-500 dark:text-red-400 dark:hover:text-red-500 dark:disabled:text-red-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-400 inline-flex items-center"
					>
						<span>{t("clearText")}</span>
					</button>
				</div>
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={requestCreateSpeech} pending={pending} disabled={!validate()} />
			</div>
		</div>
	);
};

export default TextToSpeechPage;
