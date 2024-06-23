"use client";

import React, { useState, useTransition } from "react";
import Record from "~/components/base/Record";
import Navbar from "~/components/ctt/Navbar";
import CTTOutput from "~/components/ctt/CTTOutput";
import SelectLanguage from "~/components/ctt/LanguageSelect";
import SubmitButton from "~/components/ctt/SubmitButton";
import SvgIcon from "~/components/icon/SvgIcon";
import type { CTTLanguage, CTTOutput as CTTOutputType } from "~/types/CTTTypes";
import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";
import convertToText from "~/actions/convertToText";

const SpeechToTextPage = () => {
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [file, setFile] = useState<File | null>(null);
	const [language, setLanguage] = useState<CTTLanguage>(LanguageCode.English);
	const [output, setOutput] = useState<CTTOutputType | undefined>();

	const validate = () => !!file;

	const requestCreateText = () => {
		startTransition(async () => {
			if (validate()) {
				const formData = new FormData();
				formData.append("language_code", language);
				formData.append("model", OpenAITranscriptionModel.Whisper1);
				formData.append("file", file as File);
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
		<div className="flex flex-col w-full md:pb-8 mt-4">
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
			<div className="flex-1 relative grid min-h-96 grid-cols-1 md:grid-cols-2 gap-3 content-stretch">
				<div className="flex border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600">
					<Record createRecordCallback={setFile} />
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

export default SpeechToTextPage;
