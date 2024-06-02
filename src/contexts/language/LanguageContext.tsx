"use client";

import { AbstractIntlMessages } from "next-intl";
import React, { createContext, useEffect, useState, useTransition } from "react";
import { LanguageCode } from "~/enums/language";
import { setLocale as setLocaleCookies } from "~/actions/cookies/locale";

type Store = {
	locale: LanguageCode;
	setLocale: (locale: LanguageCode) => void;
	messages?: AbstractIntlMessages | undefined;
	pending?: boolean;
};

const defaultStore: Store = {
	locale: LanguageCode.English,
	setLocale: () => {},
};

const Context = createContext<Store>(defaultStore);

interface Props {
	children: React.ReactNode;
	initLocale: LanguageCode;
	messages?: AbstractIntlMessages | undefined;
}

const LanguageProvider = ({ children, messages, initLocale = LanguageCode.English }: Props) => {
	const [pending, startTransition] = useTransition();
	const [locale, setLocaleState] = useState<LanguageCode>(initLocale);

	const setLocale = (locale: LanguageCode) => {
		startTransition(async () => {
			try {
				setLocaleState(locale);
				await setLocaleCookies(locale);
				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		});
	};

	useEffect(() => {
		window.document.documentElement.lang = locale;
	}, [locale]);

	return <Context.Provider value={{ locale, setLocale, messages, pending }}>{children}</Context.Provider>;
};

const useLanguage = () => {
	const context = React.useContext(Context);

	return context;
};

export { LanguageProvider, useLanguage };
