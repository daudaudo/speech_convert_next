"use client";

import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo, useState } from "react";
import { CTSVoiceId, CTSVoiceProvider } from "~/types/CTSTypes";
import SvgIcon from "~/components/icon/SvgIcon";
import { VoiceProvider } from "~/enums/voice";
import OpenAIVoiceMenu from "~/components/cts/voiceSelect/OpenAIVoiceMenu";
import GoogleVoiceMenu from "~/components/cts/voiceSelect/GoogleVoiceMenu";
import { capitalizeFirstLetter } from "~/utils/string";
import { OpenAIVoiceId } from "~/enums/openAi";
import SearchInput from "~/components/base/SearchInput";
import { LanguageCode } from "~/enums/language";
import SpeedSelect from "~/components/cts/SpeedSelect";
import { GoogleLanguageOptions, Languages } from "~/constants/language";
import Select from "~/components/base/Select";
import { Gender } from "~/enums/gender";

interface Props {
	value: CTSVoiceId;
	onChange: (id: CTSVoiceId, options?: { provider?: CTSVoiceProvider; speed?: number }) => void;
	providers?: VoiceProvider[];
	speed?: number;
	allowSpeed?: boolean;
}

const VoiceSelect = ({
	value,
	onChange,
	providers = [VoiceProvider.OPEN_AI, VoiceProvider.GOOGLE],
	speed = 1,
	allowSpeed = false,
}: Props) => {
	const t = useTranslations("cts.voice");
	const [open, setOpen] = useState<boolean>(false);

	const [curSpeed, setCurSpeed] = useState<number>(speed);
	const [voice, setVoice] = useState(value);
	const [provider, setProvider] = useState(providers?.[0]);
	const [searchText, setSearchText] = useState<string>("");
	const [language, setLanguage] = useState<LanguageCode>();
	const [gender, setGender] = useState<Gender | undefined>();

	const onToggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const onClickSave = () => {
		onChange(voice, { provider, speed: curSpeed });
		setOpen(false);
	};

	const onSelectOpenAIVoice = useCallback((voiceId: OpenAIVoiceId) => {
		setProvider(VoiceProvider.OPEN_AI);
		setVoice(voiceId);
	}, []);

	const onSelectGoogleVoice = useCallback((voiceId: string) => {
		setProvider(VoiceProvider.GOOGLE);
		setVoice(voiceId);
	}, []);

	const LanguageOptions = GoogleLanguageOptions.map((value) => ({ value, label: Languages[value].name }));
	const GenderOptions = useMemo(
		() => [
			{ value: Gender.ALL, label: t(`gender.${Gender.ALL}`) },
			{ value: Gender.MALE, label: t(`gender.${Gender.MALE}`) },
			{ value: Gender.FEMALE, label: t(`gender.${Gender.FEMALE}`) },
		],
		[],
	);

	return (
		<>
			<Button
				variant="text"
				onClick={onToggleOpen}
				className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center gap-2"
			>
				<SvgIcon name="volume-high" type="solid" width={24} height={24} />
				{capitalizeFirstLetter(value)}
			</Button>
			{open && (
				<Dialog open={open} handler={onToggleOpen} className="bg-white dark:bg-gray-900">
					<DialogBody className="relative px-4 py-3 flex flex-col gap-2 h-[80vh]">
						<button
							onClick={onToggleOpen}
							className="absolute rounded-full right-6 top-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
						>
							<SvgIcon name="circle-x" type="outline" width={24} height={24} />
						</button>
						<div className="font-bold text-gray-700 dark:text-gray-300 py-2">{t("voiceConfig")}</div>
						{allowSpeed && (
							<div className="inline-flex gap-2 items-center">
								<label className="font-semibold text-gray-800 dark:text-gray-200">{t("speed")}:</label>
								<SpeedSelect value={curSpeed} onChange={setCurSpeed} />
							</div>
						)}
						<div className="flex flex-wrap gap-2">
							<div className="flex flex-1 flex-col sm:flex-row gap-2">
								<Select value={language} onChange={setLanguage} options={LanguageOptions} label={t("selectLanguage")} />
								<Select value={gender} onChange={setGender} options={GenderOptions} label={t("selectGender")} />
							</div>
							<div className="w-full sm:w-auto">
								<SearchInput value={searchText} onSearchChange={setSearchText} placeholder={t("keyword")} />
							</div>
						</div>
						<div className="flex-1 flex flex-col h-96 overflow-y-auto">
							{providers.includes(VoiceProvider.OPEN_AI) && (
								<>
									<div className="text-sm text-gray-800 dark:text-gray-200 py-2">{t("voiceProvider.openai.name")}</div>
									<OpenAIVoiceMenu
										onClick={onSelectOpenAIVoice}
										selectedVoice={voice as OpenAIVoiceId}
										searchText={searchText}
										gender={gender}
									/>
								</>
							)}
							{providers.includes(VoiceProvider.GOOGLE) && (
								<>
									<div className="text-sm text-gray-800 dark:text-gray-200 py-2">
										{t("voiceProvider.google_cloud.name")}
									</div>
									<GoogleVoiceMenu
										onClick={onSelectGoogleVoice}
										selectedVoice={voice}
										searchText={searchText}
										language={language}
										gender={gender}
									/>
								</>
							)}
						</div>
					</DialogBody>
					<DialogFooter className="flex justify-end px-4 py-3">
						<button
							onClick={onClickSave}
							className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-4 py-2 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-center"
						>
							{t("save")}
						</button>
					</DialogFooter>
				</Dialog>
			)}
		</>
	);
};

export default VoiceSelect;
