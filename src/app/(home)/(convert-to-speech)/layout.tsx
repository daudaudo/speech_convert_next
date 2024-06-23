import React from "react";
import AudioDrawer from "~/components/audioDrawer";
import { ConvertToSpeechProvider } from "~/contexts/ConvertToSpeechContext";

interface Props {
	children: React.ReactNode;
}

const ConvertToSpeechLayout = ({ children }: Props) => {
	return (
		<ConvertToSpeechProvider>
			<div className="w-full rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 px-4 py-5 sm:p-6 !p-0 my-4">
				{children}
			</div>
			<AudioDrawer />
		</ConvertToSpeechProvider>
	);
};

export default ConvertToSpeechLayout;
