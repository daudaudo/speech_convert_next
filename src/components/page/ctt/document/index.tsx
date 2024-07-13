"use client";

import React, { useCallback, useState, useTransition } from "react";
import Navbar from "~/components/ctt/Navbar";
import CTTOutput from "~/components/ctt/CTTOutput";
import SelectLanguage from "~/components/ctt/LanguageSelect";
import SubmitButton from "~/components/ctt/SubmitButton";
import SvgIcon from "~/components/icon/SvgIcon";
import FileInput from "~/components/page/ctt/document/FileInput";
import type { CTTLanguage, CTTOutput as CTTOutputType } from "~/types/CTTTypes";
import { LanguageCode } from "~/enums/language";
import convertToText from "~/actions/convertToText";
import { OpenAITranscriptionModel } from "~/enums/openAi";
import { VoiceProvider } from "~/enums/voice";
import ProviderSelect from "~/components/cts/voiceSelect/ProviderSelect";

const DocumentToTextPage = () => {
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [provider, setProvider] = useState(VoiceProvider.OPEN_AI);
	const [file, setFile] = useState<File | null>(null);
	const [language, setLanguage] = useState<CTTLanguage>(LanguageCode.English);
	const [output, setOutput] = useState<CTTOutputType | undefined>();

	const validate = () => !!file;

	const buildFormData = useCallback(() => {
		const formData = new FormData();
		formData.append("provider", provider);
		formData.append("language_code", language);
		formData.append("file", file as File);
		if (provider === VoiceProvider.OPEN_AI) {
			formData.append("model", OpenAITranscriptionModel.Whisper1);
		} else if (provider === VoiceProvider.GOOGLE) {
			formData.append("language_code", language);
		}
		return formData;
	}, [provider, language, file]);

	const requestCreateText = () => {
		startTransition(async () => {
			if (validate()) {
				const formData = buildFormData();
				setOutput(undefined);
				const res = await convertToText(formData);
				if (res.error) {
					setError(res.error);
				} else {
					setError("");
					setOutput(res as CTTOutputType);
				}
			}
		});
	};

	return (
		<div className="flex flex-col w-full md:pb-8 my-4">
			<div className="shrink-0 items-center top-16 border-b border-gray-50 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 flex mb-1">
				<div className="flex-1">
					<Navbar />
				</div>
				<div className="shrink-0">
					<div className="hidden md:inline-flex justify-center p-2 text-gray-500 rounded-full dark:text-gray-400">
						<SvgIcon name="chevron-double-right" type="solid" width={24} height={24} />
					</div>
					<div className="block md:hidden">
						<SubmitButton validated={!!file} pending={pending} submit={requestCreateText} />
					</div>
				</div>
				<div className="flex-1 flex justify-end w-full">
					<SelectLanguage language={language} setLanguage={setLanguage} />
				</div>
			</div>
			<div className="w-48 p-2">
				<ProviderSelect provider={provider} changeProvider={setProvider} />
			</div>
			<div className="flex-1 relative grid min-h-96 grid-cols-1 md:grid-cols-2 gap-3 content-stretch">
				<div className="flex border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600">
					<FileInput file={file} setFile={setFile} />
				</div>
				<div className="hidden md:block z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center w-20 h-20 rounded-full bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-600 cursor-pointer disabled:cursor-not-allowed">
					<SubmitButton validated={!!file} pending={pending} submit={requestCreateText} />
				</div>
				<div className="relative flex-grow">
					<CTTOutput output={output} error={error} setError={setError} />
				</div>
			</div>
		</div>
	);
};

export default DocumentToTextPage;
