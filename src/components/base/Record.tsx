"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "~/components/base/AudioPlayer";

interface Props {
	createRecordCallback: (file: File | null) => void;
}

const Record = (props: Props) => {
	const { createRecordCallback } = props;
	const t = useTranslations("components.Record");

	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [audioURL, setAudioURL] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		return () => {
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
				mediaRecorderRef.current.stop();
			}
		};
	}, []);

	const startRecording = async () => {
		try {
			setError("");
			if (audioURL) setAudioURL("");
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
				audioChunksRef.current.push(event.data);
			};
			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
				const audioFile = new File([audioBlob], `${Date.now()}.wav`, { type: "audio/wav" });
				createRecordCallback(audioFile);
				const audioUrl = URL.createObjectURL(audioBlob);
				setAudioURL(audioUrl);
				audioChunksRef.current = [];
			};
			mediaRecorderRef.current.start();
			setIsRecording(true);
		} catch (err) {
			setError(t("connectError"));
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	return (
		<div className="p-6 w-full h-full">
			<div className="flex w-full items-center gap-2 h-14">
				{isRecording ? (
					<button
						onClick={stopRecording}
						className="font-medium bg-red-500 text-white dark:text-black py-2 px-4 rounded-lg"
					>
						{t("stop")}
					</button>
				) : (
					<button
						onClick={startRecording}
						className="font-medium bg-green-500 text-white dark:text-black py-2 px-4 rounded-lg"
					>
						{audioURL ? t("Re-record") : t("record")}
					</button>
				)}
				<div className="flex-1">
					<p className="w-full text-sm text-gray-600 dark:text-gray-400">{t("recordDescription")}</p>
				</div>
			</div>
			{audioURL && <AudioPlayer src={audioURL} />}
			{error && <p className="text-red-500 text-xs px-1">{error}</p>}
		</div>
	);
};

export default Record;
