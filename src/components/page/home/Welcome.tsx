"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Welcome = () => {
	const t = useTranslations("app");
	return (
		<section
			className="relative w-full h-[300px] md:h-[450px] flex flex-col justify-start items-center text-left text-white bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('/images/background.webp')" }}
		>
			<div className="absolute inset-0 bg-black bg-opacity-80" />
			<div className="relative inline-flex flex-col justify-center items-center h-full bg-transparent">
				<div className="w-full whitespace-nowrap font-thin text-center md:text-5xl text-3xl text-gray-100 p-4">
					{t("title")}
				</div>
				<span className="w-full font-nomal md:text-3xl text-xl text-center text-gray-100 p-4">{t("description")}</span>
			</div>
		</section>
	);
};

export default Welcome;
