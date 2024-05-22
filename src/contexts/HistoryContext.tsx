"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContextError from "~/errors/context";
import { CTSHistory, CTTHistory, HistoryType } from "~/types/HistoryTypes";
import { PagePath } from "~/enums/path";
import { getCTSHistory } from "~/actions/getCTSHistory";
import { getCTTHistory } from "~/actions/getCTTHistory";

type Store = {
	historys: (CTSHistory | CTTHistory)[];
	type: HistoryType;
	onChangeType: (type: HistoryType) => void;
	page: number;
	onChangePage: (page: number) => void;
	limit: number;
	onChangeLimit?: (limit: number) => void;
	pending?: boolean;
	error?: string;
};

const DefaultStore: Store = {
	historys: [],
	type: "cts",
	onChangeType: () => {},
	page: 1,
	limit: 10,
	onChangePage: () => {},
};

interface Props {
	children: React.ReactNode;
}

const Context = React.createContext<Store>(DefaultStore);

const HistoryProvider = ({ children }: Props) => {
	const params = useSearchParams();
	const router = useRouter();
	const initRef = useRef(false);
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>(undefined);
	const [historys, setHistorys] = useState<(CTSHistory | CTTHistory)[]>([]);

	const type: HistoryType = useMemo(() => {
		const paramType = params.get("type");
		return (paramType ?? "cts") as HistoryType;
	}, [params]);

	const page: number = useMemo(() => {
		const paramPage = params.get("page");
		return paramPage ? parseInt(paramPage) : 1;
	}, [params]);

	const limit: number = useMemo(() => {
		const paramLimit = params.get("limit");
		return paramLimit ? parseInt(paramLimit) : 10;
	}, [params]);

	const onChangeType = (newType: HistoryType) => {
		const curSearchParams = new URLSearchParams(params);
		curSearchParams.set("type", newType);
		curSearchParams.set("page", DefaultStore.page.toString());
		curSearchParams.set("limit", DefaultStore.limit.toString());
		router.push(`${PagePath.history}?${curSearchParams.toString()}`);
	};

	const onChangePage = (newPage: number) => {
		const curSearchParams = new URLSearchParams(params);
		curSearchParams.set("page", newPage.toString());
		router.push(`${PagePath.history}?${curSearchParams.toString()}`);
	};

	const onChangeLimit = (newLimit: number) => {
		const curSearchParams = new URLSearchParams(params);
		curSearchParams.set("limit", newLimit.toString());
		router.push(`${PagePath.history}?${curSearchParams.toString()}`);
	};

	const requestGetHistory = useCallback(() => {
		const requestFunc = type === "cts" ? getCTSHistory : getCTTHistory;
		console.log(">>>", { limit, page, type });
		startTransition(async () => {
			const res = await requestFunc(limit, page);
			if ("error" in res) {
				setError(res.error);
			} else {
				setError(undefined);
				setHistorys(res);
			}
		});
	}, [limit, page, type]);

	useEffect(() => {
		if (initRef.current) {
			return;
		}
		requestGetHistory();
		return () => {
			initRef.current = true;
		};
	}, [type, page, limit, requestGetHistory]);

	const store: Store = { historys, type, onChangeType, page, onChangePage, limit, onChangeLimit, pending, error };

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
