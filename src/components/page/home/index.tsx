"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Header from "~/components/header";
import FrequentQuestions from "~/components/page/home/FrequentQuestions";
import InstructionVideo from "~/components/page/home/InstructionVideo";
import Feature from "~/components/page/home/Feature";
import Description from "~/components/page/home/Description";
import SvgIcon from "~/components/icon/SvgIcon";
import Footer from "~/components/footer";

const HomePage = () => {
	const t = useTranslations();
	return (
		<div className="min-h-screen w-screen flex flex-col">
			<div className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-800 z-50  border-b-[1px] border-gray-300 dark:border-gray-700">
				<header className="md:max-w-screen-xl mx-auto px-2 md:px-0">
					<Header />
				</header>
			</div>
			<div className="max-w-screen-xl mx-auto w-full min-h-[calc(100vh-4rem)] pb-10 flex flex-col items-center">
				<section className="flex flex-col items-center gap-2">
					<SvgIcon type="app" name="logo" width={70} />
					<div className="w-full font-bold md:text-5xl text-3xl text-center text-gray-700 dark:text-gray-200">
						{t("home.welcome")} <span className="whitespace-nowrap">{t("app.title")}</span>
					</div>
				</section>
				<Feature />
				<InstructionVideo />
				<Description />
				<FrequentQuestions />
			</div>
			<footer className="w-full bg-gray-100 dark:bg-gray-800 border-t-[1px] border-gray-300 dark:border-gray-700 p-4">
				<Footer />
			</footer>
		</div>
	);
};

export default HomePage;
