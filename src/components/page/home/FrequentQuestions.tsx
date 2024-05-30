"use client";

import React, { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { frequentQuestions } from "~/constants/home";

export const FrequentQuestions = () => {
	const [open, setOpen] = useState<number>(0);

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
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">Các câu hỏi thường gặp</div>
			{frequentQuestions.map(({ question, answer }, index) => renderQuestion(index, question, answer))}
		</section>
	);
};

export default FrequentQuestions;
