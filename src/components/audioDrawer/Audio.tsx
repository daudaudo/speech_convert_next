import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import React from "react";
import { CTSModel, CTSSpeed, CTSVoiceId } from "~/types/CTSTypes";

interface Props {
	input?: string;
	streamUrl: string;
	downloadUrl: string;
	voiceId?: CTSVoiceId;
	model?: CTSModel;
	speed?: CTSSpeed;
}

const Audio = (props: Props) => {
	const t = useTranslations("cts.voice.openAIVoice");
	const { input, streamUrl, downloadUrl, voiceId } = props;
	const downLoadName = `${input?.slice(0, 10)}.mp3`;
	return (
		<div className="px-4 py-5 sm:p-6 text-gray-800 dark:text-gray-100">
			{voiceId && <div className="text-lg font-semibol">{t(`${voiceId}.name`)}</div>}
			<div className="flex flex-row items-center gap-2">
				<audio controls className="w-full" controlsList="nodownload">
					<source src={streamUrl} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
				<a href={downloadUrl} download={downLoadName} className="">
					<ArrowDownTrayIcon className="h-6 w-6 text-black dark:text-white" />
				</a>
			</div>
		</div>
	);
};

export default Audio;
