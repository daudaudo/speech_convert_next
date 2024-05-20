"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContextError from "~/errors/context";
import { HistoryType } from "~/types/HistoryTypes";
import { PagePath } from "~/enums/path";

type Store = {
	type: HistoryType;
	onChangeType: (type: HistoryType) => void;
};

const DefaultStore: Store = {
	type: "cts",
	onChangeType: () => {},
};

interface Props {
	children: React.ReactNode;
}

const Context = React.createContext<Store>(DefaultStore);

const HistoryProvider = ({ children }: Props) => {
	const params = useSearchParams();
	const router = useRouter();

	const type: HistoryType = useMemo(() => {
		const paramType = params.get("type");
		return (paramType ?? "cts") as HistoryType;
	}, [params]);

	const onChangeType = (newType: HistoryType) => {
		const curSearchParams = new URLSearchParams(params);
		curSearchParams.set("type", newType);
		router.push(`${PagePath.history}?${curSearchParams.toString()}`);
	};

	const store: Store = { type, onChangeType };

	return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useHistory = () => {
	const context = React.useContext(Context);
	if (!context) {
		throw new ContextError("useHistory");
	}
	return context;
};

export { HistoryProvider, useHistory };
