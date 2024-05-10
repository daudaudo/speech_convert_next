enum OpenAITTSModel {
	TTS1 = "tts-1",
	TTS1HD = "tts-1-hd",
}

enum OpenAIVoiceId {
	Alloy = "alloy",
	Echo = "echo",
	Fable = "fable",
	Onyx = "onyx",
	Nova = "nova",
	Shimmer = "shimmer",
}

enum OpenAITranscriptionModel {
	Whisper1 = "whisper-1",
}

// enum OpenAITranscriptionResponseFormat {
// 	Json = "json",
// 	VerboseJson = "verbose_json",
// 	Text = "text",
// 	Srt = "srt",
// 	Vtt = "vtt",
// }

export { OpenAITTSModel, OpenAIVoiceId, OpenAITranscriptionModel };
