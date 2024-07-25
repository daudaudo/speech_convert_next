"use client";

import { Button, ButtonGroup, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
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

	const onToggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const onClickSave = () => {
		onChange(voice, { provider, speed: curSpeed });
		setOpen(false);
	};

	const LanguageOptions = GoogleLanguageOptions.map((value) => ({ value, label: Languages[value].name }));

	const renderProviderButton = (id: CTSVoiceProvider) => {
		const name = t(`voiceProvider.${id}.name`);
		const selected = id === provider;
		return (
			<Button
				variant="text"
				size="sm"
				onClick={() => setProvider(id)}
				className={`rounded-lg flex-1 shadow-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:shadow-none border-none ${selected ? "bg-primary-200 dark:bg-primary-800" : ""}`}
			>
				{name}
			</Button>
		);
	};

	const renderListVoice = () => {
		switch (provider) {
			case VoiceProvider.OPEN_AI:
				return <OpenAIVoiceMenu onClick={setVoice} selectedVoice={voice as OpenAIVoiceId} searchText={searchText} />;
			case VoiceProvider.GOOGLE:
			default:
				return <GoogleVoiceMenu onClick={setVoice} selectedVoice={voice} searchText={searchText} language={language} />;
		}
	};

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
			<Dialog open={open} handler={onToggleOpen} className="bg-white dark:bg-gray-900">
				<DialogBody className="relative px-6 py-4 flex flex-col gap-2 h-[80vh]">
					<button
						onClick={onToggleOpen}
						className="absolute rounded-full right-6 top-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
					>
						<SvgIcon name="circle-x" type="outline" width={24} height={24} />
					</button>
					<div className="font-bold text-gray-700 dark:text-gray-300 py-4">{t("voiceConfig")}</div>
					{allowSpeed && (
						<div className="inline-flex gap-2 items-center">
							<label className="text-gray-800 dark:text-gray-200">Speech: </label>
							<SpeedSelect value={curSpeed} onChange={setCurSpeed} />
						</div>
					)}
					<ButtonGroup className="gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 my-1">
						{providers?.includes(VoiceProvider.GOOGLE) && renderProviderButton(VoiceProvider.GOOGLE)}
						{providers?.includes(VoiceProvider.OPEN_AI) && renderProviderButton(VoiceProvider.OPEN_AI)}
					</ButtonGroup>
					<div className="inline-flex flex-row gap-1">
						{provider === VoiceProvider.GOOGLE && (
							<div className="w-40">
								<Select value={language} onChange={setLanguage} options={LanguageOptions} label={t("selectLanguage")} />
							</div>
						)}
						<SearchInput value={searchText} onSearchChange={setSearchText} />
					</div>
					<div className="flex-1 flex flex-col h-96 overflow-y-auto">{renderListVoice()}</div>
				</DialogBody>
				<DialogFooter className="flex justify-end px-6 py-4">
					<button
						onClick={onClickSave}
						className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-4 py-2 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-center"
					>
						{t("save")}
					</button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default VoiceSelect;
