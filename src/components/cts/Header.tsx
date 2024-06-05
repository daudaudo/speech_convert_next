"use client";

import React from "react";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSSpeed } from "~/types/CTSTypes";

const Header = () => {
	const { speed, setSpeed, model, setModel } = useConvertToSpeech();

	const onChangeSpeed = (speed: number) => {
		setSpeed(speed as CTSSpeed);
	};

	return (
		<nav className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 px-2">
			<CTSNavbar />
			<span className="inline-flex gap-1 mt-2 md:mt-0">
				<SpeedSelect value={speed} onChange={onChangeSpeed} />
				<ModelSelect value={model} onChange={setModel} />
			</span>
		</nav>
	);
};

export default Header;
