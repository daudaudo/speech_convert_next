"use client";

import { Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import React, { useState } from "react";
import { SvgName } from "~/components/icon/svg";
import SvgIcon from "~/components/icon/SvgIcon";
import { Languages } from "~/constants/language";
import { useLanguage } from "~/contexts/language/LanguageContext";
import { LanguageCode } from "~/enums/language";

const LanguageSwitch = () => {
	const { locale, setLocale } = useLanguage();
	const [open, setOpen] = useState<boolean>(false);

	const onClickItem = (language: LanguageCode) => {
		setLocale(language);
		setOpen(false);
	};

	const renderLanguageItem = (language: LanguageCode) => {
		return (
			<Button
				variant="text"
				onClick={() => onClickItem(language)}
				className="w-full inline-flex items-center gap-2 text-gray-800 dark:text-gray-200"
			>
				<SvgIcon type="flag" name={language as SvgName} width={24} height={24} />
				{Languages[language].name}
			</Button>
		);
	};

	return (
		<div className="w-10 h-10">
			<Popover open={open} handler={setOpen} placement="bottom">
				<PopoverHandler>
					<Button
						variant="text"
						aria-label="Language switch"
						className="w-full h-full p-0 rounded-full text-gray-800 dark:text-gray-200 flex justify-center items-center"
					>
						<SvgIcon type="flag" name={locale as SvgName} width={24} height={24} />
					</Button>
				</PopoverHandler>
				<PopoverContent className="z-45 bg-gray-100 dark:bg-gray-800 flex flex-col items-center gap-2">
					{renderLanguageItem(LanguageCode.English)}
					{renderLanguageItem(LanguageCode.Vietnamese)}
					{renderLanguageItem(LanguageCode.Chinese)}
					{renderLanguageItem(LanguageCode.Hindi)}
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default LanguageSwitch;
