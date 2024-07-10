"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/voiceSelect";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import type { CTSModel, CTSVoiceId, CTSVoiceProvider } from "~/types/CTSTypes";
import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";
import convertToSpeech from "~/actions/convertToSpeech";
import { CTSConfig } from "~/constants/configs";
import SvgIcon from "~/components/icon/SvgIcon";
import { VoiceProvider } from "~/enums/voice";
import { SpeechResponseData } from "~/types/response/cts";
import AudioPlayer from "~/components/base/AudioPlayer";

const TextToSpeechPage = () => {
	const t = useTranslations("cts");

	const { maxTextLength } = CTSConfig;

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [text, setText] = useState<string>("");
	const [voice, setVoice] = useState<{
		id: CTSVoiceId;
		provider: CTSVoiceProvider;
	}>({ id: OpenAIVoiceId.Alloy, provider: VoiceProvider.OPEN_AI });
	const [speed, setSpeed] = useState<number>(1);
	const [model, setModel] = useState<CTSModel>(OpenAITTSModel.TTS1);
	const [output, setOutput] = useState<SpeechResponseData | undefined>(undefined);

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

	const buildFormData = useCallback(() => {
		const formData = new FormData();
		formData.append("provider", voice.provider);
		if (voice.provider === VoiceProvider.OPEN_AI) {
			formData.append("voice", voice.id);
			formData.append("model", model);
		} else if (voice.provider === VoiceProvider.GOOGLE) {
			formData.append("voice_name", voice.id);
		}
		formData.append("speed", speed.toString());
		formData.append("input", text);
		return formData;
	}, [voice, model, speed, text]);

	const onCreateSpeech = useCallback(() => {
		if (validated) {
			startTransition(async () => {
				try {
					const formData = buildFormData();
					setOutput(undefined);
					const res = await convertToSpeech(formData);
					if ("error" in res) {
						setError(res.error);
					} else {
						clearError();
						setOutput(res);
					}
				} catch (error) {
					if (error instanceof Error) {
						setError(error.message);
					}
				}
			});
		}
	}, [validated, startTransition, buildFormData, clearError]);

	return (
		<div className="flex-1 w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<SpeedSelect value={speed} onChange={setSpeed} />
					<ModelSelect value={model} onChange={setModel} />
					<VoiceSelect value={voice.id} onChange={(id, provider) => setVoice({ id, provider })} />
				</span>
			</div>
			<div className="relative flex-1 w-full flex flex-col">
				{error && (
					<div className="text-red-500 p-4 text-sm">
						<div className="flex flex-row gap-2 items-center">
							<button
								onClick={clearError}
								className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
							>
								<SvgIcon name="circle-x" type="outline" width={16} height={16} />
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
					className={`${error ? "hidden" : ""} flex-1 p-2 w-full pt-8 pl-4 pr-2 resize-none overflow-y-auto h-full min-h-96 px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3`}
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
			{output && (
				<div className="w-full flex items-center p-1 bg-gray-50 dark:bg-gray-900 px-4 gap-2 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
					<a href={output.download_url} className="text-gray-700 dark:text-gray-200">
						<SvgIcon name="arrow-down-to-bracket" type="solid" width={24} height={24} />
					</a>
					<AudioPlayer src={output.download_url} />
				</div>
			)}
		</div>
	);
};

export default TextToSpeechPage;
