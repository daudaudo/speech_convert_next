"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FileSizeUnit } from "~/enums/file";
import { convertBytes } from "~/utils/file";
import SvgIcon from "~/components/icon/SvgIcon";
import { CTTConfig } from "~/constants/configs";

interface Props {
	file: File | null;
	setFile: (file: File | null) => void;
}

const FileInput = ({ file, setFile }: Props) => {
	const t = useTranslations("ctt");

	const { fileAccept = [], maxFileSize = 0 } = CTTConfig;

	const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const onClickClearFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setFile(null);
		e.preventDefault();
	};

	const renderFile = () => {
		if (!file)
			return (
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<SvgIcon name="cloud-arrow-up" width={32} height={32} className="text-gray-400 dark:text-gray-300" />
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
		<div>
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
					{!file && <input type="file" accept={fileAccept.join(",")} onChange={onInputFileChange} className="hidden" />}
				</label>
			</div>
			<div className="w-full px-6 text-sm text-wrap text-primary-500">
				<SvgIcon name="circle-info" width={16} height={16} />
				{t("fileInputInfo")}
			</div>
		</div>
	);
};

export default FileInput;
