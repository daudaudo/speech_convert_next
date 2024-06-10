"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { List, ListItem, ListItemPrefix, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { PagePath } from "~/enums/path";
import type { NavbarItem } from "~/types/navbar";
import SvgIcon from "~/components/icon/SvgIcon";

interface NavBarItemPopoverProps {
	items: NavbarItem[];
	label?: string;
}

const NavBarItemPopover = ({ items, label }: NavBarItemPopoverProps) => {
	const [open, setOpen] = useState(false);

	const triggers = {
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
	};

	return (
		<Popover open={open} handler={setOpen} placement="bottom-start">
			<PopoverHandler {...triggers}>
				<Link
					href={items[0].path}
					className="px-4 py-2 cursor-pointer font-nomal text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
				>
					{label}
				</Link>
			</PopoverHandler>
			<PopoverContent
				{...triggers}
				className="z-45 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-1"
			>
				<List className="flex flex-col">
					{items.map((item) => {
						const { path, label, iconName } = item;
						if (!label) return null;
						return (
							<Link key={`${label}-${path}`} href={path}>
								<ListItem className="hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
									{iconName && (
										<ListItemPrefix>
											<SvgIcon
												name={iconName}
												type="outline"
												width={20}
												height={20}
												className="text-gray-600 dark:text-gray-400"
											/>
										</ListItemPrefix>
									)}
									<span className="text-gray-700 dark:text-gray-300">{label}</span>
								</ListItem>
							</Link>
						);
					})}
				</List>
			</PopoverContent>
		</Popover>
	);
};

const NavBar = () => {
	const t = useTranslations("header.directional");

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

	return (
		<nav className="items-center rounded-full transition-transform duration-200 hidden lg:flex px-4">
			<NavBarItemPopover items={convertToSpeechItems} label={t("speech")} />
			<NavBarItemPopover items={convertToTextItems} label={t("text")} />
			<NavBarItemPopover items={historyItems} label={t("history")} />
		</nav>
	);
};

export default NavBar;
