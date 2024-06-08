"use client";

import React, { useCallback, useState } from "react";
import {
	Bars3Icon,
	ChatBubbleLeftRightIcon,
	DocumentIcon,
	LanguageIcon,
	MicrophoneIcon,
} from "@heroicons/react/24/outline";
import {
	Dialog,
	DialogBody,
	IconButton,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
} from "@material-tailwind/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { PagePath } from "~/enums/path";
import { SpeechConvertIcon } from "~/types/icon";
import { useTheme } from "~/contexts/ThemeContext";
import { ThemeMode } from "~/enums/theme";

type ListItem = {
	path?: PagePath;
	label: string;
	PreIcon?: SpeechConvertIcon;
	SufIcon?: SpeechConvertIcon;
};

const DocSearch = () => {
	const t = useTranslations("header.directional");
	const { themeMode, setThemeMode } = useTheme();
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const convertToSpeechItems: ListItem[] = [
		{ path: PagePath.textToSpeech, label: t("convertTextToSpeech"), PreIcon: LanguageIcon },
		{ path: PagePath.documentToSpeech, label: t("convertDocumentToSpeech"), PreIcon: DocumentIcon },
		{
			path: PagePath.conversationToSpeech,
			label: t("convertConversationToSpeech"),
			PreIcon: ChatBubbleLeftRightIcon,
		},
	];

	const convertToTextItems: ListItem[] = [
		{ path: PagePath.speechToText, label: t("convertSpeechToText"), PreIcon: MicrophoneIcon },
		{ path: PagePath.documentToText, label: t("convertDocumentToText"), PreIcon: DocumentIcon },
		{ path: PagePath.textToText, label: t("convertTextToText"), PreIcon: LanguageIcon },
	];

	const supportUserItems: ListItem[] = [
		{ path: PagePath.speechHistory, label: t("speechHistory") },
		{ path: PagePath.textHistory, label: t("textHistory") },
		{ path: PagePath.conversationHistory, label: t("conversationHistory") },
	];

	const renderList = useCallback(
		(items: ListItem[], label?: string) => {
			return (
				<div className="w-full text-gray-800 dark:text-gray-100">
					{label && <span>{label}</span>}
					<List>
						{items.map((item) => {
							const { path = "#", label, PreIcon, SufIcon } = item;
							if (!label) return null;
							return (
								<Link
									key={`${label}-${path}`}
									href={path}
									onClick={toggleOpen}
									className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<ListItem>
										{PreIcon && (
											<ListItemPrefix>
												<PreIcon className="w-5 h-5" />
											</ListItemPrefix>
										)}
										{label}
										{SufIcon && (
											<ListItemSuffix>
												<SufIcon className="w-5 h-5" />
											</ListItemSuffix>
										)}
									</ListItem>
								</Link>
							);
						})}
					</List>
				</div>
			);
		},
		[toggleOpen],
	);

	return (
		<>
			<IconButton onClick={toggleOpen} variant="text" className="p-0 rounded-full">
				<Bars3Icon className="h-5 w-5 text-gray-800 dark:text-gray-200 [&>path]:stroke-[2]" />
			</IconButton>
			<Dialog size="xl" open={open} handler={toggleOpen} className="bg-white dark:bg-gray-900">
				{/* <DialogHeader className="text-gray-800 dark:text-gray-100">header</DialogHeader> */}
				<DialogBody className="max-h-[80vh] overflow-y-auto">
					{renderList(convertToSpeechItems, t("createSpeech"))}
					{renderList(convertToTextItems, t("createText"))}
					{renderList(supportUserItems, t("history"))}
					<div className="w-full text-gray-800 dark:text-gray-100">
						<span>{t("theme")}</span>
						<List>
							<ListItem
								disabled={themeMode === ThemeMode.light}
								onClick={() => setThemeMode(ThemeMode.light)}
								className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<ListItemPrefix>
									<SunIcon className="h-5 w-5" />
								</ListItemPrefix>
								{t("lightMode")}
							</ListItem>
							<ListItem
								disabled={themeMode === ThemeMode.dark}
								onClick={() => setThemeMode(ThemeMode.dark)}
								className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<ListItemPrefix>
									<MoonIcon className="h-5 w-5" />
								</ListItemPrefix>
								{t("darkMode")}
							</ListItem>
						</List>
					</div>
				</DialogBody>
			</Dialog>
		</>
	);
};

export default DocSearch;
