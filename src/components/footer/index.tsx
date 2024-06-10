"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import type { NavbarItem } from "~/types/navbar";
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
		<div
			className="w-full bg-gray-100 dark:bg-gray-800 bg-cover bg-center"
			// style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
		>
			<div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
				<div className="flex flex-col items-start gap-4 mb-4 md:mb-0">
					<div className="flex items-end gap-2 self-center text-2xl font-extrabold uppercase whitespace-nowrap">
						<SvgIcon name="logo" width={60} height={60} />
						<span className="text-gray-800 dark:text-gray-200">{t("app.title")}</span>
					</div>
					<span className="text-gray-600 dark:text-gray-400">
						{t("app.copyright")} {t("app.title")}
					</span>
				</div>
				<div className="flex flex-col md:flex-row gap-6">
					{renderListNavigate(convertToSpeechItems, "Convert to Speech")}
					{renderListNavigate(convertToTextItems, "Convert to Text")}
				</div>
			</div>
		</div>
	);
};

export default Footer;
