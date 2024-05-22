"use client";

import React from "react";
import CTSHistory from "~/components/history/CTSHistory";
import CTTHistory from "~/components/history/CTTHistory";
import { useHistory } from "~/contexts/HistoryContext";

const ListHistory = () => {
	const { type } = useHistory();

	switch (type) {
		case "ctt":
			return <CTTHistory />;
		case "cts":
			return <CTSHistory />;
		default:
			return <CTSHistory />;
	}
};

export default ListHistory;
