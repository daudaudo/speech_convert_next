"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useLocalStorage } from "usehooks-ts";
import { ConfigProvider as AntdProvider, theme as themeAntd } from "antd";
import storageKey from "~/enums/storageKey";
import ContextError from "~/errors/contextError";

interface ThemeContextStore {
	isDark: boolean;
	toggleDark: () => void;
	isCompact: boolean;
	toggleCompact: () => void;
}
const ThemeContext = createContext<ThemeContextStore>({} as ThemeContextStore);

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	const [cache] = useState(createCache);
	const alreadyInserted = useRef(new Set<string>());

	const [dark, setDark] = useLocalStorage(storageKey.DarkMode, false);
	const [compact, setCompact] = useLocalStorage(storageKey.CompactMode, false);

	// Clear cache when server inserted HTML
	// Issue: cssinjs breaks by streaming mode
	// See more: https://github.com/ant-design/ant-design/issues/45955
	useServerInsertedHTML(() => {
		if (cache.cache.size === 0) return;
		for (const key of alreadyInserted.current.keys()) {
			cache.cache.delete(key);
		}
		const html = extractStyle(cache, true);
		for (const key of cache.cache.keys()) {
			alreadyInserted.current.add(key);
		}
		cache.cache.clear();
		return <style dangerouslySetInnerHTML={{ __html: html }} className="antd" />;
	});

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
		<ThemeContext.Provider value={store}>
			<StyleProvider cache={cache} hashPriority="high">
				<AntdProvider theme={theme}>{children}</AntdProvider>
			</StyleProvider>
		</ThemeContext.Provider>
	);
};

const useTheme = () => {
	const context = useContext(ThemeContext);
	const { token } = themeAntd.useToken();
	if (!context) throw new ContextError("useTheme");
	return {
		token: token,
		isDark: context.isDark,
		toggleDark: context.toggleDark,
		isCompact: context.isCompact,
		toggleCompact: context.toggleCompact,
	};
};

export { ThemeProvider, useTheme };
