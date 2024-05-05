import React from "react";
import Header from "@sc-components/Header";
import { ConvertToSpeechProvider } from "~/contexts/ConvertToSpeechContext";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<ConvertToSpeechProvider>
			<div className="flex flex-col h-screen w-screen">
				<div className="shrink-0">
					<Header />
				</div>
				<div className="flex-1 w-full md:max-w-screen-xl">{children}</div>
				{/* <div className="md:shrink-0 hidden md:block">Footer</div> */}
			</div>
		</ConvertToSpeechProvider>
	);
};

export default UserLayout;
