"use client";

import React, { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { useTranslations } from "next-intl";

export const FrequentQuestions = () => {
	const [open, setOpen] = useState<number>(0);
	const t = useTranslations("home");

	const handleOpen = (key: number) => setOpen(open === key ? 0 : key);

	const renderQuestion = (key: number, question: string, answer: string) => {
		return (
			<Accordion key={key} open={open === key}>
				<AccordionHeader onClick={() => handleOpen(key)}>
					<span className="font-bold text-lg text-gray-800 dark:text-gray-100">{question}</span>
				</AccordionHeader>
				<AccordionBody>
					<span className="font-thin text-xl text-gray-700 dark:text-gray-200">{answer}</span>
				</AccordionBody>
			</Accordion>
		);
	};

	return (
		<section className="flex flex-col gap-2 w-full px-2">
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">{t("frequentQuestionTitle")}</div>
			{renderQuestion(0, t("frequentQuestions.question1.question"), t("frequentQuestions.question1.answer"))}
			{renderQuestion(1, t("frequentQuestions.question2.question"), t("frequentQuestions.question2.answer"))}
			{renderQuestion(2, t("frequentQuestions.question3.question"), t("frequentQuestions.question3.answer"))}
			{renderQuestion(3, t("frequentQuestions.question4.question"), t("frequentQuestions.question4.answer"))}
			{renderQuestion(4, t("frequentQuestions.question5.question"), t("frequentQuestions.question5.answer"))}
			{renderQuestion(
				5,
				t("frequentQuestions.question6.question"),
				t("frequentQuestions.question6.answer", { email: "contact@speechconvert.com" }),
			)}
		</section>
	);
};

export default FrequentQuestions;
