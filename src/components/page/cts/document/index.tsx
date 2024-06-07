"use client";

import React, { useCallback } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { DocumentIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { FileSizeUnit } from "~/enums/file";
import { convertBytes } from "~/utils/file";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/VoiceSelect";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import { CTSSpeed } from "~/types/CTSTypes";

const DocumentToSpeechPage = () => {
	const t = useTranslations("cts");
	const { input, changeInput, config, pending, requestCreateSpeech, validate } = useConvertToSpeech();
	const { speed, setSpeed, model, setModel, voiceId, setVoiceId } = useConvertToSpeech();
	const { fileAccept = [], maxFileSize = 0 } = config;

	const onChangeSpeed = useCallback(
		(speed: number) => {
			setSpeed(speed as CTSSpeed);
		},
		[setSpeed],
	);

	const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			changeInput(e.target.files[0]);
		}
	};

	const onClickClearFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		changeInput(null);
		e.preventDefault();
	};

	const renderFile = () => {
		const file = input.file as File;
		if (!file)
			return (
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<CloudArrowUpIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
						<span className="font-semibold">{t("upload")}</span>
						<br />
					</p>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						{t("fileAccept", { value: fileAccept.join(", ") })}
					</div>
					<div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
						{t("maxFileSize", { value: convertBytes(maxFileSize, FileSizeUnit.MEGABYTE) })}
					</div>
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
		<div className="w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<SpeedSelect value={speed} onChange={onChangeSpeed} />
					<ModelSelect value={model} onChange={setModel} />
					<VoiceSelect value={voiceId} onChange={setVoiceId} />
				</span>
			</div>
			<div className="flex-1 w-full">
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
						<input type="file" accept={fileAccept.join(",")} onChange={onInputFileChange} className="hidden" />
					</label>
				</div>
				<div className="flex flex-col w-full px-6 text-sm0">
					<div className="flex flex-row items-center gap-1 text-primary-500">
						<InformationCircleIcon className="h-4 w-4" />
						<div>{t("fileInputInfo")}</div>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={requestCreateSpeech} pending={pending} disabled={!validate()} />
			</div>
		</div>
	);
};

export default DocumentToSpeechPage;
