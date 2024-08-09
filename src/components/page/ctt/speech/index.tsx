"use client";

import React, { useCallback, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import Record from "~/components/base/Record";
import Navbar from "~/components/ctt/Navbar";
import CTTOutput from "~/components/ctt/CTTOutput";
import SubmitButton from "~/components/ctt/SubmitButton";
import type { CTTLanguage } from "~/types/CTTTypes";
import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";
import convertToText from "~/actions/convertToText";
import { VoiceProvider } from "~/enums/voice";
import ProviderSelect from "~/components/cts/voiceSelect/ProviderSelect";
import { GoogleLanguageOptions, Languages } from "~/constants/language";
import Select from "~/components/base/Select";
import { useAppDispatch } from "~/store/store";
import { authActions } from "~/store/slices/auth";

const SpeechToTextPage = () => {
	const dispatch = useAppDispatch();
	const t = useTranslations("ctt");

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [provider, setProvider] = useState(VoiceProvider.OPEN_AI);
	const [file, setFile] = useState<File | null>(null);
	const [language, setLanguage] = useState<CTTLanguage>(LanguageCode.English);
	const [textOutput, setTextOutput] = useState<string>("");

	const LanguageOptions = GoogleLanguageOptions.map((value) => ({ value, label: Languages[value].name }));

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
				setTextOutput("");
				const res = await convertToText(formData);
				if ("error" in res) {
					setError(res.error);
				} else {
					setError("");
					setTextOutput(res.text);
					dispatch(authActions.updateBalance(res.user.balance));
				}
			}
		});
	};
	return (
		<div className="flex flex-col w-full my-4 gap-2">
			<div className="shrink-0 items-center top-16 border-b border-gray-50 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 flex mb-1">
				<div className="flex-1 border-b border-gray-200">
					<Navbar />
				</div>
				<div className="shrink-0 block md:hidden">
					<SubmitButton validated={!!file} pending={pending} submit={requestCreateText} />
				</div>
			</div>
			<div className="w-full inline-flex flex-row gap-1 items-center border-b-2 border-dashed border-gray-300 p-1">
				<div className="w-48 p-2">
					<ProviderSelect provider={provider} changeProvider={setProvider} />
				</div>
				{provider === VoiceProvider.GOOGLE && (
					<div className="w-48 p-2">
						<Select options={LanguageOptions} value={language} onChange={setLanguage} label={t("selectLanguage")} />
					</div>
				)}
			</div>
			<div className="flex-1 relative grid min-h-96 grid-cols-1 md:grid-cols-2 gap-3 content-stretch p-1">
				<div className="flex border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600">
					<Record createRecordCallback={setFile} />
				</div>
				<div className="hidden md:block z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center w-20 h-20 rounded-full bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-600 cursor-pointer disabled:cursor-not-allowed">
					<SubmitButton validated={!!file} pending={pending} submit={requestCreateText} />
				</div>
				<div className="relative flex-grow">
					<CTTOutput text={textOutput} error={error} setError={setError} />
				</div>
			</div>
		</div>
	);
};

export default SpeechToTextPage;
