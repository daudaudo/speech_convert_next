"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { FileSizeUnit } from "~/enums/file";
import { convertBytes } from "~/utils/file";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/VoiceSelect";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import type { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";
import convertToSpeech from "~/actions/convertToSpeech";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSConfig } from "~/constants/configs";
import SvgIcon from "~/components/icon/SvgIcon";

const DocumentToSpeechPage = () => {
	const t = useTranslations("cts");

	const { setOutput } = useConvertToSpeech();

	const { fileAccept, maxFileSize } = CTSConfig;

	const [pending, startTransition] = useTransition();
	const [, setError] = useState<string>("");

	const [file, setFile] = useState<File | null>(null);
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(OpenAIVoiceId.Alloy);
	const [speed, setSpeed] = useState<number>(1);
	const [model, setModel] = useState<CTSModel>(OpenAITTSModel.TTS1);

	const clearError = useCallback(() => setError(""), []);

	const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const onClickClearFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setFile(null);
		e.preventDefault();
	};

	const validated = useMemo(() => {
		return !!file;
	}, [file]);

	const onCreateSpeech = useCallback(() => {
		if (validated) {
			startTransition(async () => {
				try {
					const formData = new FormData();
					formData.append("voice", voiceId);
					formData.append("model", model);
					formData.append("speed", speed.toString());
					formData.append("input", file as File);
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
	}, [validated, startTransition]);

	const renderFile = () => {
		if (!file)
			return (
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<SvgIcon
						name="cloud-arrow-up"
						type="outline"
						width={32}
						height={32}
						className="text-gray-400 dark:text-gray-300"
					/>
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
					<SvgIcon name="file" type="solid" width={32} height={32} className="text-gray-500 dark:text-gray-400" />
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
					<SpeedSelect value={speed} onChange={setSpeed} />
					<ModelSelect value={model} onChange={setModel} />
					<VoiceSelect value={voiceId} onChange={setVoiceId} />
				</span>
			</div>
			<div className="flex-1 w-full">
				<div className="relative flex items-center justify-center w-full p-6">
					<label className="flex flex-col items-center rounded-lg justify-center w-full h-64 cursor-pointer border-2 border-dashed dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
						{!!file && (
							<button
								onClick={onClickClearFile}
								className="absolute right-8 top-8 cursor-pointer inline-flex justify-center p-2 text-gray-500 rounded-full"
							>
								<SvgIcon name="x-mark" type="solid" width={20} height={20} />
							</button>
						)}
						{renderFile()}
						<input type="file" accept={fileAccept.join(", ")} onChange={onInputFileChange} className="hidden" />
					</label>
				</div>
				<div className="flex flex-col w-full px-6 text-sm0">
					<div className="flex flex-row items-center gap-1 text-primary-500">
						<SvgIcon name="circle-info" type="solid" width={16} height={16} />
						<div>{t("fileInputInfo")}</div>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={!validated} />
			</div>
		</div>
	);
};

export default DocumentToSpeechPage;
