"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import LoadingData from "~/components/animations/LoadingData";
import SvgIcon from "~/components/icon/SvgIcon";
import { Gender } from "~/enums/gender";
import { LanguageCode } from "~/enums/language";
import { voiceActions } from "~/store/slices/voice";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { capitalizeFirstLetter } from "~/utils/string";

interface Props {
	onClick: (id: string) => void;
	selectedVoice?: string;
	searchText?: string;
	language?: LanguageCode;
	gender?: Gender;
}

const GoogleVoiceMenu = ({ onClick, selectedVoice, searchText, language, gender }: Props) => {
	const dispatch = useAppDispatch();
	const voices = useAppSelector((state) => state.voice.google_cloud);
	const t = useTranslations("cts");

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const voicesDisplay = useMemo(() => {
		let rs = [...voices];
		if (searchText || language || gender)
			rs = rs.filter((voice) => {
				const { name, ssmlGender, languageCodes } = voice;
				const matchSearch = searchText ? name.searchIn(searchText) || ssmlGender.searchIn(searchText) : true;
				const matchLanguage = language ? languageCodes.findIndex((code) => code.searchIn(language)) !== -1 : true;
				const matchGender = !!gender && gender !== Gender.ALL ? gender.toLocaleUpperCase() === ssmlGender : true;
				return matchSearch && matchLanguage && matchGender;
			});
		return rs;
	}, [voices, searchText, gender, language]);

	useEffect(() => {
		startTransition(async () => {
			try {
				setError("");
				await dispatch(voiceActions.fetchGoogleVoices());
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		});
	}, []);

	if (pending) return <LoadingData size={24} />;

	if (error)
		return (
			<div className="text-red-500 p-4 text-sm">
				<div className="flex flex-row gap-2 items-center">
					<button
						onClick={() => setError("")}
						className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
					>
						<SvgIcon name="circle-x" type="outline" width={16} height={16} />
					</button>
					<span>{t("textError", { error })}</span>
				</div>
			</div>
		);

	return (
		<>
			{voicesDisplay.map(({ name, ssmlGender }) => {
				const [voiceLang, , voiceType] = name.split("-");
				return (
					<button
						key={name}
						onClick={() => onClick(name)}
						className={`inline-flex items-center cursor-pointer pr-6 pl-4 py-2 border-b dark:border-t-gray-800 dark:hover:bg-gray-800 ${name === selectedVoice ? "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-800 border-l-2 border-l-primary-600 rounded-l-lg" : ""}`}
					>
						<div className="flex items-start gap-2.5 w-full">
							<div className="flex flex-col items-start gap-1 flex-1">
								<span className="text-sm font-semibold text-gray-900 dark:text-white">
									{capitalizeFirstLetter(name)}
								</span>
								<span className="text-xs font-normal text-gray-500 dark:text-gray-400">
									{capitalizeFirstLetter(ssmlGender)}, {voiceLang}, {capitalizeFirstLetter(voiceType)}
								</span>
							</div>
						</div>
					</button>
				);
			})}
		</>
	);
};

export default GoogleVoiceMenu;
