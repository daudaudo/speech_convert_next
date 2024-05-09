"use client";

import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-tailwind/react";
import ContextError from "~/errors/context";

type Store = {
	theme: "light" | "dark";
	toggleTheme: () => void;
};

const DefaultStore: Store = {
	theme: "light",
	toggleTheme: () => {},
};

const Context = React.createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}
const Provider = ({ children }: Props) => {
	const [theme, setTheme] = React.useState<Store["theme"]>(DefaultStore.theme);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const store: Store = { theme, toggleTheme };

	return (
		<MuiThemeProvider value={{}}>
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
