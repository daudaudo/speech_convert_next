"use client";

import React, { useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-tailwind/react";
import { useLocalStorage } from "usehooks-ts";
import ContextError from "~/errors/context";
import storageKey from "~/enums/storageKey";
import { muiCustomTheme } from "~/utils/theme";
import { ThemeMode } from "~/enums/theme";

type Store = {
	themeMode: ThemeMode;
	toggleDarkMode: () => void;
	setThemeMode: (themeMode: ThemeMode) => void;
};

const DefaultStore: Store = {
	themeMode: ThemeMode.light,
	toggleDarkMode: () => {},
	setThemeMode: () => {},
};

const Context = React.createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}
const Provider = ({ children }: Props) => {
	const [themeMode, setTheme] = useLocalStorage(storageKey.theme, DefaultStore.themeMode);

	const toggleDarkMode = () => {
		setTheme((prev) => (prev === ThemeMode.light ? ThemeMode.dark : ThemeMode.light));
	};

	const setThemeMode = (themeMode: ThemeMode) => {
		setTheme(themeMode);
	};

	useEffect(() => {
		document.documentElement.classList.remove(ThemeMode.light, ThemeMode.dark);
		document.documentElement.classList.add(themeMode);
	}, [themeMode]);

	const store: Store = { themeMode, toggleDarkMode, setThemeMode };

	return (
		<MuiThemeProvider value={muiCustomTheme}>
			<Context.Provider value={store}>{children}</Context.Provider>
		</MuiThemeProvider>
	);
};

const useContext = () => {
	const context = React.useContext(Context);
	if (!context) {
		throw new ContextError("useTheme");
	}
	return context;
};

export { Provider as ThemeProvider, useContext as useTheme };
