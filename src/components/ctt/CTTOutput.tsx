"use client";

import React from "react";
import { IconButton } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "usehooks-ts";
import { useConvertToText } from "~/contexts/ConvertToTextContext";
import SvgIcon from "~/components/icon/SvgIcon";

const CTTOutput = () => {
	const t = useTranslations("ctt");
	const { output, error, clearError } = useConvertToText();
	const [, copyToClipboard] = useCopyToClipboard();
	const [copied, setCopied] = React.useState(false);

	const onCopyOutput = () => {
		if (output?.text) {
			copyToClipboard(output.text)
				.then(() => {
					setCopied(true);
					setTimeout(() => {
						setCopied(false);
					}, 2000);
				})
				.catch((error) => {
					throw error;
				});
		}
	};

	return (
		<div className="flex flex-col h-full max-h-full p-6 bg-white border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">
			{!!output && (
				<>
					<div className="flex-1">
						<div className="relative w-full h-full">
							<textarea
								readOnly
								value={output.text}
								className="w-full pb-6 pt-1 resize-none overflow-y-auto md:h-full min-h-[238px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-700 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none"
							/>
						</div>
					</div>
					<div className="shrink-0 pb-1 flex justify-end">
						<IconButton variant="text" onClick={onCopyOutput}>
							{copied ? (
								<SvgIcon name="check" type="solid" width={20} height={20} />
							) : (
								<SvgIcon name="clipboard" type="outline" width={20} height={20} />
							)}
						</IconButton>
					</div>
				</>
			)}
			{error && (
				<div className="text-red-500 text-sm">
					<div className="flex flex-row gap-2 items-center">
						<button
							onClick={clearError}
							className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
						>
							<SvgIcon name="circle-x" type="outline" width={16} height={16} className="text-red-500" />
						</button>
						<span>{t("outputError", { error })}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CTTOutput;
