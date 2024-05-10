"use client";

import React from "react";

// interface Props {
// 	submitAudio: (audio: Blob) => void;
// }

const RecordInput = () => {
	// const [isRecording, setIsRecording] = useState(false);
	// const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
	// const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	// const chunksRef = useRef<Blob[]>([]);

	// const startRecording = async () => {
	// 	try {
	// 		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	// 		setMediaStream(stream);
	// 		const mediaRecorder = new MediaRecorder(stream);
	// 		mediaRecorder.ondataavailable = handleDataAvailable;
	// 		mediaRecorder.start();
	// 		setIsRecording(true);
	// 		mediaRecorderRef.current = mediaRecorder;
	// 	} catch (error) {
	// 		console.error("Error accessing microphone:", error);
	// 	}
	// };

	// const stopRecording = () => {
	// 	if (mediaRecorderRef.current && isRecording) {
	// 		mediaRecorderRef.current.stop();
	// 		setIsRecording(false);
	// 	}
	// };

	// const handleDataAvailable = (event: BlobEvent) => {
	// 	chunksRef.current.push(event.data);
	// };

	// const handleDownload = () => {
	// 	if (chunksRef.current.length === 0) {
	// 		console.error("No audio data recorded");
	// 		return;
	// 	}
	// 	const blob = new Blob(chunksRef.current, { type: "audio/webm" });
	// 	submitAudio(blob);
	// };
	return (
		<div className="flex flex-col">
			{/* <button onClick={startRecording} disabled={isRecording}>
				Start Recording
			</button>
			<button onClick={stopRecording} disabled={!isRecording}>
				Stop Recording
			</button>
			<button onClick={handleDownload} disabled={!mediaStream}>
				Download Recording
			</button> */}
		</div>
	);
};

export default RecordInput;
