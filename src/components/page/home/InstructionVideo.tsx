"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { YouTubeEmbed } from "@next/third-parties/google";
import { InstructionVideoId } from "~/constants/app";

interface Props {
	width?: number;
	height?: number;
}

const InstructionVideo = (props: Props) => {
	const { width = 375 } = props;
	const t = useTranslations("home");

	return (
		<div className="flex flex-col gap-2">
			<div className="w-full font-bold text-xl text-gray-700 dark:text-gray-200">{t("userManual")}</div>
			<YouTubeEmbed videoid={InstructionVideoId} width={width} />
		</div>
	);
};

export default InstructionVideo;
