"use client";

import React from "react";
import Header from "~/components/header";
import FrequentQuestions from "~/components/page/home/FrequentQuestions";
import InstructionVideo from "~/components/page/home/InstructionVideo";
import Feature from "~/components/page/home/Feature";
import Welcome from "~/components/page/home/Welcome";
import Description from "~/components/page/home/Description";
import Footer from "~/components/footer";

const HomePage = () => {
	return (
		<div className="w-screen flex flex-col">
			<header className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-800 z-50 border-b-[1px] border-gray-300 dark:border-gray-700">
				<Header />
			</header>
			<div className="w-full min-h-[calc(100vh-4rem)] pb-10 flex flex-col items-center gap-4">
				<Welcome />
				<div className="max-w-screen-xl mx-auto w-full flex flex-col items-center gap-4 m-1">
					<Feature />
					<InstructionVideo />
					<Description />
					<FrequentQuestions />
				</div>
			</div>
			<footer className="w-full bg-gray-100 dark:bg-gray-800 border-t-[1px] border-gray-300 dark:border-gray-700 p-4">
				<Footer />
			</footer>
		</div>
	);
};

export default HomePage;
