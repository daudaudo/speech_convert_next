import React from "react";
import TextToSpeechInput from "@sc-components/TextToSpeechInput";

const SoundPage = () => {
	return (
		<div className="relative h-full px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 content-stretch transition-all duration-200">
			<div className="lg:col-span-2 transition-all duration-200 flex flex-col space-y-6 h-full">
				<TextToSpeechInput />
			</div>
			<div className="select-voice relative flex-grow h-full transition-all duration-200" />
		</div>
	);
};

export default SoundPage;
