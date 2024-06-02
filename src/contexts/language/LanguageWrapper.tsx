"use server";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import { getLocale } from "~/actions/cookies/locale";
import { LanguageProvider } from "~/contexts/language/LanguageContext";
import { LanguageCode } from "~/enums/language";

interface Props {
	children: React.ReactNode;
}

const LanguageWrapper = async ({ children }: Props) => {
	const locale = await getLocale();
	const messages = await getMessages({ locale });

	return (
		<NextIntlClientProvider messages={messages}>
			<LanguageProvider initLocale={locale as LanguageCode} messages={messages}>
				{children}
			</LanguageProvider>
		</NextIntlClientProvider>
	);
};

export default LanguageWrapper;
