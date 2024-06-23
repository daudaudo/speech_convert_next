"use client";

import React, { useCallback, useState } from "react";
import { Dialog, DialogBody, IconButton, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import { SpeechConvertIcon } from "~/types/icon";
import { useTheme } from "~/contexts/ThemeContext";
import { ThemeMode } from "~/enums/theme";
import { NavbarItem } from "~/types/navbar";
import SvgIcon from "~/components/icon/SvgIcon";

type ListItem = {
	path?: PagePath;
	label: string;
	iconName?: SpeechConvertIcon;
	SufIcon?: SpeechConvertIcon;
};

const DocSearch = () => {
	const t = useTranslations("header.directional");
	const { themeMode, setThemeMode } = useTheme();
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const convertToSpeechItems: NavbarItem[] = [
		{ path: PagePath.textToSpeech, label: t("convertTextToSpeech"), iconName: "text" },
		{ path: PagePath.documentToSpeech, label: t("convertDocumentToSpeech"), iconName: "file" },
		{ path: PagePath.conversationToSpeech, label: t("convertConversationToSpeech"), iconName: "messages" },
	];

	const convertToTextItems: NavbarItem[] = [
		{ path: PagePath.speechToText, label: t("convertSpeechToText"), iconName: "microphone" },
		{ path: PagePath.documentToText, label: t("convertDocumentToText"), iconName: "file" },
	];

	const historyItems: NavbarItem[] = [
		{ path: PagePath.speechHistory, label: t("speechHistory"), iconName: "volume-high" },
		{ path: PagePath.textHistory, label: t("textHistory"), iconName: "text" },
		{ path: PagePath.conversationHistory, label: t("conversationHistory"), iconName: "messages" },
	];

	const renderList = useCallback(
		(items: NavbarItem[], label?: string) => {
			return (
				<div className="w-full text-gray-800 dark:text-gray-100">
					{label && <span>{label}</span>}
					<List>
						{items.map((item) => {
							const { path = "#", label, iconName } = item;
							if (!label) return null;
							return (
								<Link
									key={`${label}-${path}`}
									href={path}
									onClick={toggleOpen}
									className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<ListItem>
										{iconName && (
											<ListItemPrefix>
												<SvgIcon name={iconName} type="outline" width={20} height={20} />
											</ListItemPrefix>
										)}
										{label}
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
			<IconButton onClick={toggleOpen} variant="text" className="p-0 rounded-full lg:hidden">
				<SvgIcon
					name="bars"
					type="solid"
					width={20}
					height={20}
					className="text-gray-800 dark:text-gray-200 [&>path]:stroke-[2]"
				/>
			</IconButton>
			<Dialog size="xl" open={open} handler={toggleOpen} className="bg-white dark:bg-gray-900">
				{/* <DialogHeader className="text-gray-800 dark:text-gray-100">header</DialogHeader> */}
				<DialogBody className="max-h-[80vh] overflow-y-auto">
					{renderList(convertToSpeechItems, t("convertToSpeech"))}
					{renderList(convertToTextItems, t("createText"))}
					{renderList(historyItems, t("history"))}
					<div className="w-full text-gray-800 dark:text-gray-100">
						<span>{t("theme")}</span>
						<List>
							<ListItem
								disabled={themeMode === ThemeMode.light}
								onClick={() => setThemeMode(ThemeMode.light)}
								className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<ListItemPrefix>
									<SvgIcon name="moon" type="solid" width={20} height={20} />
								</ListItemPrefix>
								{t("lightMode")}
							</ListItem>
							<ListItem
								disabled={themeMode === ThemeMode.dark}
								onClick={() => setThemeMode(ThemeMode.dark)}
								className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<ListItemPrefix>
									<SvgIcon name="sun" type="solid" width={20} height={20} />
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
