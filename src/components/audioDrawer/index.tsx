"use client";

import React, { useMemo } from "react";
import { Drawer } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import AudioPlayer from "~/components/base/AudioPlayer";
import SvgIcon from "~/components/icon/SvgIcon";

const AudioDrawer = () => {
	const t = useTranslations("cts");

	const { output, resultShowed, toggleShowResult } = useConvertToSpeech();

	const data = useMemo(() => {
		if (!output) return null;
		const isConversation = "partials" in output;
		return {
			id: output._id,
			url: isConversation ? output.audio_url : output.download_url,
			title: isConversation ? t("conversation") : t(`voice.openAIVoice.${output.voice}.name`),
		};
	}, [output]);

	if (!data) return null;

	return (
		<>
			<Drawer
				placement="bottom"
				open={resultShowed}
				onClose={toggleShowResult}
				transition={{ type: "tween" }}
				overlayProps={{ className: "backdrop-blur-none" }}
				className="bg-opacity-0"
			>
				<div className="w-full h-full md:w-3/4 mx-auto max-w-4xl flex flex-col items-end">
					<button onClick={toggleShowResult} className="flex-1 w-full cursor-default" />
					<div className="relative w-full overflow-x-hidden bg-white border shadow-xl border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-900">
						<button
							onClick={toggleShowResult}
							className="inline-flex items-center cursor-pointer hover:bg-gray-50 py-2 px-4 dark:hover:bg-gray-800 w-full"
						>
							<span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600" />
							<h5 className="inline-flex items-center text-base text-gray-700 dark:text-gray-200 font-medium">
								<SvgIcon name="play-pause" type="solid" width={28} height={28} />
								&nbsp;Audio Player
							</h5>
						</button>
						<div className="px-4 py-5 sm:p-6 text-gray-800 dark:text-gray-100">
							{data.title && <div className="text-lg font-semibol">{data.title}</div>}
							<div className="flex flex-row items-center gap-2">
								<AudioPlayer src={data.url} />
								<a href={data.url} className="text-black dark:text-white">
									<SvgIcon name="arrow-down-to-bracket" type="solid" width={24} height={24} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</Drawer>
			{!resultShowed && (
				<button
					onClick={toggleShowResult}
					className="block animate-bounce-t-3 fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 p-3 pt-5 hover:pb-5 dark:bg-gray-800 rounded-t-full border-t border-l border-r dark:border-primary-700 border-primary-200 cursor-pointer transition-all duration-200 text-primary-700 dark:text-primary-200"
				>
					<SvgIcon name="chevron-double-up" type="solid" width={32} height={32} />
				</button>
			)}
		</>
	);
};

export default AudioDrawer;
