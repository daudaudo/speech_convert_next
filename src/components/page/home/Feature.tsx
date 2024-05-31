"use client";

import React from "react";
import { Button, Carousel, Textarea } from "@material-tailwind/react";
import { ChevronDoubleRightIcon, MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";

const Feature = () => {
	const t = useTranslations("home");
	return (
		<Carousel
			loop
			autoplay
			prevArrow={({}) => null}
			nextArrow={({}) => null}
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
					{new Array(length).fill("").map((_, i) => (
						<span
							key={i}
							className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
								activeIndex === i
									? "w-8 bg-primary-500"
									: "w-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
							}`}
							onClick={() => setActiveIndex(i)}
						/>
					))}
				</div>
			)}
			className="relative h-auto min-h-96 bg-gray-200 dark:bg-gray-800 md:rounded-lg md:m-4"
		>
			<div className="px-16 py-2 flex flex-col gap-8 h-full justify-center">
				<header className="flex items-center gap-2 text-primary-500 text-xl font-bold">
					<SpeakerWaveIcon className="h-8 w-8" />
					<span>{t("createSpeech")}</span>
				</header>
				<Textarea
					readOnly
					labelProps={{ className: "text-gray-700 dark:text-gray-200" }}
					label="Văn bản cần chuyển đổi"
					value={"Welcome to SpeechConvert.\nThis is a demo audio clip."}
					className="text-gray-700 dark:text-gray-200 text-xl font-thin"
				/>
				<div className="inline-flex">
					<Button variant="text" className="text-gray-700 dark:text-gray-200">
						<SpeakerWaveIcon className="h-8 w-8" />
					</Button>
					<audio controls src={"/demo/speech-output.mp3"} controlsList="" className="flex-1" />
				</div>
				<div className="flex justify-end m-8">
					<Link href={PagePath.textToSpeech} className="">
						<Button variant="filled" className="bg-primary-500 flex items-center gap-2 text-xl font-semibolds">
							{t("tryFree")}
							<ChevronDoubleRightIcon className="h-4 w-6 animate-bounce-r-2" />
						</Button>
					</Link>
				</div>
			</div>
			<div className="px-16 py-2 flex flex-col gap-8 h-full justify-center">
				<header className="flex items-center gap-2 text-primary-500 text-xl font-bold">
					<SpeakerWaveIcon className="h-8 w-8" />
					<span>{t("speechTranslater")}</span>
				</header>
				<div className="inline-flex">
					<Button variant="text" className="text-gray-700 dark:text-gray-200">
						<MicrophoneIcon className="h-8 w-8" />
					</Button>
					<audio controls src={"/demo/speech-input.mp3"} className="flex-1" />
				</div>
				<Textarea
					readOnly
					labelProps={{ className: "text-gray-700 dark:text-gray-200" }}
					label="Văn bản sau khi dịch"
					value={"Welcome to SpeechConvert.\nThis is a demo audio clip."}
					className="text-gray-700 dark:text-gray-200 text-xl font-thin"
				/>
				<div className="flex justify-end m-8">
					<Link href={PagePath.speechToText} className="">
						<Button variant="filled" className="bg-primary-500 flex items-center gap-2 text-xl font-semibolds">
							{t("tryFree")}
							<ChevronDoubleRightIcon className="h-4 w-6 animate-bounce-r-2" />
						</Button>
					</Link>
				</div>
			</div>
		</Carousel>
	);
};

export default Feature;
