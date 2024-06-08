import React from "react";
import HistoryNavBar from "~/components/history/NavBar";

interface Props {
	children: React.ReactNode;
}

const HistoryLayout = ({ children }: Props) => {
	return (
		<div className="h-full w-full flex flex-col">
			<HistoryNavBar />
			<div className="flex-1 w-full">{children}</div>
		</div>
	);
};

export default HistoryLayout;
