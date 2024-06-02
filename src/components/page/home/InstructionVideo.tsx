"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { InstructionVideoUrl } from "~/constants/home";

interface Props {
	width?: number;
	height?: number;
}

const InstructionVideo = (props: Props) => {
	const { width = 375, height = 315 } = props;
	const t = useTranslations("home");

	return (
		<div className="flex flex-col gap-2">
			<div className="w-full font-bold text-xl text-gray-700 dark:text-gray-200">{t("userManual")}</div>
			<iframe
				width={width}
				height={height}
				src={InstructionVideoUrl}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="rounded-lg"
			/>
		</div>
	);
};

export default InstructionVideo;
