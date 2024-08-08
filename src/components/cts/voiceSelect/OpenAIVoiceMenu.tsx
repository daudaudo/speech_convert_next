"use client";

import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { Gender } from "~/enums/gender";
import { OpenAIVoiceId } from "~/enums/openAi";

const OpenAIVoices = [
	OpenAIVoiceId.Alloy,
	OpenAIVoiceId.Echo,
	OpenAIVoiceId.Fable,
	OpenAIVoiceId.Onyx,
	OpenAIVoiceId.Nova,
	OpenAIVoiceId.Shimmer,
];

interface Props {
	onClick: (id: OpenAIVoiceId) => void;
	selectedVoice?: OpenAIVoiceId;
	searchText?: string;
	gender?: Gender;
}

const OpenAIVoiceMenu = ({ onClick, selectedVoice, searchText, gender }: Props) => {
	const t = useTranslations("cts.voice");

	const voicesDisplay = useMemo(() => {
		if (searchText || gender)
			return OpenAIVoices.filter((voice) => {
				const name = t(`openAIVoice.${voice}.name`);
				const description = t(`openAIVoice.${voice}.description`);
				const genderSearch = t(`gender.${gender}`);
				const matchSearch = searchText ? name.searchIn(searchText) || description.searchIn(searchText) : true;
				const matchGender = !!gender && gender !== Gender.ALL ? description.searchIn(genderSearch) : true;
				return matchGender && matchSearch;
			});
		return OpenAIVoices;
	}, [searchText, gender]);

	const renderVoice = (id: OpenAIVoiceId) => {
		const name = t(`openAIVoice.${id}.name`);
		const description = t(`openAIVoice.${id}.description`);
		const selected = id === selectedVoice;
		return (
			<button
				key={id}
				onClick={() => onClick(id)}
				className={`inline-flex items-center cursor-pointer pr-6 pl-4 py-2 border-b dark:border-t-gray-800 dark:hover:bg-gray-800 ${selected ? "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-800 border-l-2 border-l-primary-600 rounded-l-lg" : ""}`}
			>
				<div className="flex items-start gap-2.5 w-full">
					<div className="flex flex-col items-start gap-1 flex-1">
						<span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
						<span className="text-xs font-normal text-gray-500 dark:text-gray-400">{description}</span>
					</div>
				</div>
			</button>
		);
	};

	return <>{voicesDisplay.map(renderVoice)}</>;
};

export default OpenAIVoiceMenu;
