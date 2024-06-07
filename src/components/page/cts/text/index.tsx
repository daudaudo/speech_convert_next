"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/VoiceSelect";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import type { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";
import convertToSpeech from "~/actions/convertToSpeech";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import CTSConfig from "~/constants/configs";

const TextToSpeechPage = () => {
	const t = useTranslations("cts");

	const { setOutput } = useConvertToSpeech();

	const { maxTextLength } = CTSConfig;

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [text, setText] = useState<string>("");
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(OpenAIVoiceId.Alloy);
	const [speed, setSpeed] = useState<number>(1);
	const [model, setModel] = useState<CTSModel>(OpenAITTSModel.TTS1);

	const clearError = useCallback(() => setError(""), []);

	const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	}, []);

	const clearText = useCallback(() => {
		setText("");
	}, []);

	const validated = useMemo(() => {
		return text.length > 0;
	}, [text]);

	const onCreateSpeech = useCallback(() => {
		if (validated) {
			startTransition(async () => {
				try {
					const formData = new FormData();
					formData.append("voice", voiceId);
					formData.append("model", model);
					formData.append("speed", speed.toString());
					formData.append("input", text);
					const res = await convertToSpeech(formData);
					clearError();
					setOutput(res);
				} catch (error) {
					if (error instanceof Error) {
						setError(error.message);
					}
				}
			});
		}
	}, [validated, startTransition]);

	return (
		<div className="w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<SpeedSelect value={speed} onChange={setSpeed} />
					<ModelSelect value={model} onChange={setModel} />
					<VoiceSelect value={voiceId} onChange={setVoiceId} />
				</span>
			</div>
			<div className="relative flex-1 w-full">
				{error && (
					<div className="text-red-500 p-4 text-sm">
						<div className="flex flex-row gap-2 items-center">
							<button
								onClick={clearError}
								className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
							>
								<XCircleIcon className="h-4 w-4" />
							</button>
							<span>{t("textError", { error })}</span>
						</div>
					</div>
				)}
				<textarea
					autoFocus
					placeholder={t("textPlaceholder")}
					required
					maxLength={maxTextLength}
					onChange={onTextChange}
					value={text}
					className={`${error ? "hidden" : ""} w-full pt-8 pl-4 pr-2 resize-none overflow-y-auto h-full min-h-[210px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3`}
				/>
				<div
					className={`${error || !text ? "hidden" : ""} absolute top-[10px] right-3 text-right text-xs font-thin dark:text-gray-300 flex flex-row space-x-4 items-center`}
				>
					<span>
						{text.length} / {maxTextLength}
					</span>
					<button
						onClick={clearText}
						disabled={!text}
						className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 text-red-500 hover:text-red-600 disabled:text-red-500 dark:text-red-400 dark:hover:text-red-500 dark:disabled:text-red-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-400 inline-flex items-center"
					>
						<span>{t("clearText")}</span>
					</button>
				</div>
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={!validated} />
			</div>
		</div>
	);
};

export default TextToSpeechPage;
