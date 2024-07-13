"use client";

import { Option, Select } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";
import { VoiceProvider } from "~/enums/voice";
import type { CTSVoiceProvider } from "~/types/CTSTypes";

const Providers = [VoiceProvider.GOOGLE, VoiceProvider.OPEN_AI];

interface Props {
	provider: CTSVoiceProvider;
	changeProvider: (provider: CTSVoiceProvider) => void;
	className?: string;
}

const ProviderSelect = ({ changeProvider, provider, className }: Props) => {
	const t = useTranslations("cts.voice");
	const onSelectChange = (value?: string) => {
		if (!value) return;
		changeProvider(value as VoiceProvider);
	};

	const renderSelectedOptions = () => {
		return (
			<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
				{provider}
			</span>
		);
	};

	return (
		<Select
			size="md"
			label={t("selectProviderLabel")}
			value={provider}
			selected={renderSelectedOptions}
			onChange={onSelectChange}
			className={className}
		>
			{Providers.map((p) => (
				<Option key={p} value={p}>
					<span className="w-full flex items-center gap-1.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75">
						{p}
					</span>
				</Option>
			))}
		</Select>
	);
};

export default ProviderSelect;
