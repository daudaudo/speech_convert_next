"use client";

import React, { useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-tailwind/react";
import { useLocalStorage } from "usehooks-ts";
import ContextError from "~/errors/context";
import storageKey from "~/enums/storageKey";
import { muiCustomTheme } from "~/utils/theme";

type Store = {
	theme: "light" | "dark";
	toggleDarkMode: () => void;
};

const DefaultStore: Store = {
	theme: "dark",
	toggleDarkMode: () => {},
};

const Context = React.createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}
const Provider = ({ children }: Props) => {
	const [theme, setTheme] = useLocalStorage(storageKey.theme, DefaultStore.theme);

	const toggleDarkMode = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		document.documentElement.classList.add(theme);
	}, [theme]);

	const store: Store = { theme, toggleDarkMode };

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
