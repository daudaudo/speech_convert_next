import React from "react";
import { TextToSpeechProvider } from "~/contexts/TextToSpeechContext";

interface Props {
	children: React.ReactNode;
}
const SoundLayout = ({ children }: Props) => {
	return (
		<TextToSpeechProvider>
			<div className="flex-1 w-full md:max-w-screen-xl mx-auto">
				<div className="flex flex-col h-full w-full">
					<div className="flex-1 pb-44 md:pb-8 mt-4">{children}</div>
				</div>
			</div>
		</TextToSpeechProvider>
	);
};

export default SoundLayout;
