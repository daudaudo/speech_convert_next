"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import type { NavbarItem } from "~/types/navbar";
import { SOCIAL_NETWORKS } from "~/constants/app";
import SvgIcon from "../icon/SvgIcon";

const Footer = () => {
	const t = useTranslations();

	const convertToSpeechItems: NavbarItem[] = [
		{ path: PagePath.textToSpeech, label: t("footer.directional.convertTextToSpeech"), iconName: "text" },
		{ path: PagePath.documentToSpeech, label: t("footer.directional.convertDocumentToSpeech"), iconName: "file" },
		{
			path: PagePath.conversationToSpeech,
			label: t("footer.directional.convertConversationToSpeech"),
			iconName: "messages",
		},
	];

	const convertToTextItems: NavbarItem[] = [
		{ path: PagePath.speechToText, label: t("footer.directional.convertSpeechToText"), iconName: "microphone" },
		{ path: PagePath.documentToText, label: t("footer.directional.convertDocumentToText"), iconName: "file" },
	];

	const renderListNavigate = useCallback((items: NavbarItem[], label?: string) => {
		return (
			<div className="flex flex-col">
				{label && <span className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</span>}
				<nav className="flex flex-col gap-2">
					{items.map((item) => {
						const { path = "#", label } = item;
						if (!label) return null;
						return (
							<Link
								key={`${label}-${path}`}
								href={path}
								className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
							>
								{label}
							</Link>
						);
					})}
				</nav>
			</div>
		);
	}, []);

	return (
		<div className="w-full bg-gray-100 dark:bg-gray-800 bg-cover bg-center p-4">
			<div className="max-w-screen-xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
				<div className="flex md:hidden lg:flex flex-col items-start gap-4 mb-4 md:mb-0">
					<div className="flex items-end gap-2 self-center text-2xl font-extrabold uppercase whitespace-nowrap">
						<SvgIcon name="logo" width={60} height={60} />
						<span className="text-gray-800 dark:text-gray-200">{t("app.title")}</span>
					</div>
					<span className="text-gray-600 dark:text-gray-400">
						{t("app.copyright")} {t("app.title")}
					</span>
				</div>
				<div className="flex flex-col md:flex-row gap-6 md:justify-between">
					<div className="flex flex-col">
						<span className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
							{t("footer.directional.socialsNetworks")}
						</span>
						<nav className="flex flex-col gap-2">
							{SOCIAL_NETWORKS.map((social) => {
								const { name, url, icon } = social;
								return (
									<Link
										key={name}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
									>
										<SvgIcon name={icon} width={20} height={20} />
										{name}
									</Link>
								);
							})}
						</nav>
					</div>
					<div className="hidden md:block w-px bg-gray-300 dark:bg-gray-600" />
					{renderListNavigate(convertToSpeechItems, t("footer.directional.convertToSpeech"))}
					<div className="hidden md:block w-px bg-gray-300 dark:bg-gray-600" />
					{renderListNavigate(convertToTextItems, t("footer.directional.convertToText"))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
