import React from "react";
import HistoryNavBar from "~/components/page/history/HistoryNavBar";
import { HistoryProvider } from "~/contexts/HistoryContext";

interface Props {
	children: React.ReactNode;
}

const HistoryLayout = ({ children }: Props) => {
	return (
		<HistoryProvider>
			<div className="h-full w-full flex flex-col">
				<HistoryNavBar />
				<div className="flex-1 w-full">{children}</div>
			</div>
		</HistoryProvider>
	);
};

export default HistoryLayout;
