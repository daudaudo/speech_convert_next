"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ConfigProvider, theme as themeAntd } from "antd";
import storageKey from "~/enums/storageKey";
import ContextError from "~/errors/contextError";

interface AntdContextStore {
	isDark: boolean;
	toggleDark: () => void;
	isCompact: boolean;
	toggleCompact: () => void;
}
const AntdContext = createContext<AntdContextStore>({} as AntdContextStore);

interface AntdProviderProps {
	children?: React.ReactNode;
}
const AntdProvider = ({ children }: AntdProviderProps) => {
	const [dark, setDark] = useLocalStorage(storageKey.DarkMode, false);
	const [compact, setCompact] = useLocalStorage(storageKey.CompactMode, false);

	const toggleDark = useCallback(() => {
		setDark((prev) => !prev);
	}, [setDark]);

	const toggleCompact = useCallback(() => {
		setCompact((prev) => !prev);
	}, [setCompact]);

	const theme = useMemo(() => {
		const algorithm = [];
		if (dark) algorithm.push(themeAntd.darkAlgorithm);
		if (compact) algorithm.push(themeAntd.compactAlgorithm);
		return { algorithm };
	}, [dark, compact]);

	const store = useMemo(
		() => ({
			isDark: dark,
			toggleDark,
			isCompact: compact,
			toggleCompact,
		}),
		[dark, toggleDark, compact, toggleCompact],
	);

	return (
		<AntdContext.Provider value={store}>
			<ConfigProvider theme={theme}>{children}</ConfigProvider>
		</AntdContext.Provider>
	);
};

const useAntd = () => {
	const context = useContext(AntdContext);
	if (!context) {
		throw new ContextError("useAntd");
	}
	return {
		isDark: context.isDark,
		toggleDark: context.toggleDark,
		isCompact: context.isCompact,
		toggleCompact: context.toggleCompact,
	};
};

export { AntdProvider, useAntd };
