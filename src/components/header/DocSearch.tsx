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
	DialogHeader,
	IconButton,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
} from "@material-tailwind/react";
import Link from "next/link";
import { PagePath } from "~/enums/path";
import { SpeechConvertIcon } from "~/types/icon";

type ListItem = {
	path?: PagePath;
	label: string;
	PreIcon?: SpeechConvertIcon;
	SufIcon?: SpeechConvertIcon;
};

const convertToSpeechItems: ListItem[] = [
	{ path: PagePath.textToSpeech, label: "Chuyển đổi văn bản thành giọng nói", PreIcon: LanguageIcon },
	{ path: PagePath.documentToSpeech, label: "Chuyển đổi tệp thành giọng nói", PreIcon: DocumentIcon },
	{
		path: PagePath.conversationToSpeech,
		label: "Chuyển đổi hội thoại thành giọng nói",
		PreIcon: ChatBubbleLeftRightIcon,
	},
];

const convertToTextItems: ListItem[] = [
	{ path: PagePath.speechToText, label: "Chuyển đổi ghi âm thành văn bản", PreIcon: MicrophoneIcon },
	{ path: PagePath.speechToText, label: "Chuyển đổi tệp thành văn bản", PreIcon: DocumentIcon },
	{ path: PagePath.speechToText, label: "Dịch văn bản", PreIcon: LanguageIcon },
];

const supportUserItems: ListItem[] = [{ path: PagePath.history, label: "Lịch sử chuyển đổi" }];

const DocSearch = () => {
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

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
					{renderList(convertToSpeechItems, "Tạo giọng nói")}
					{renderList(convertToTextItems, "Tạo văn bản")}
					{renderList(supportUserItems, "Hỗ trợ người dùng")}
				</DialogBody>
			</Dialog>
		</>
	);
};

export default DocSearch;
