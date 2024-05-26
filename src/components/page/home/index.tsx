"use client";

import React from "react";
import Header from "~/components/header";
import FrequentQuestions from "~/components/page/home/FrequentQuestions";
import InstructionVideo from "~/components/page/home/InstructionVideo";
import Feature from "~/components/page/home/Feature";
import SvgIcon from "~/components/icon/SvgIcon";

const HomePage = () => {
	return (
		<div className="w-full min-h-full flex flex-col items-center gap-12 pb-10">
			<div className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-800 z-50">
				<Header />
			</div>
			<section className="flex flex-col items-center gap-2">
				<SvgIcon type="app" name="logo" width={70} />
				<div className="w-full font-bold md:text-5xl text-3xl text-center text-gray-700 dark:text-gray-200">
					Chào mừng đến với <span className="whitespace-nowrap">Speech&nbsp;Convert</span>
				</div>
			</section>
			<Feature />
			<InstructionVideo />
			<FrequentQuestions />
		</div>
	);
};

export default HomePage;
