// Input types for the ConvertToSpeech
type CTSInput = string;

// Model types for the ConvertToSpeech
enum OpenAITTSModel {
	TTS1 = "tts-1",
	TTS1HD = "tts-1-hd",
}
type CTSModel = OpenAITTSModel;

// Voice types for the ConvertToSpeech
enum OpenAIVoiceId {
	Alloy = "alloy",
	Echo = "echo",
	Fable = "fable",
	Onyx = "onyx",
	Nova = "nova",
	Shimmer = "shimmer",
}
enum GoogleVoiceId {
	Standard = "standard",
	WaveNet = "wavenet",
}
type CTSVoiceId = OpenAIVoiceId | GoogleVoiceId;

// Voice data for the ConvertToSpeech
// Get it from api later
type CTSVoice = {
	id: CTSVoiceId;
	name: string;
	description: string;
};
const CTSVoices: CTSVoice[] = [
	{ id: OpenAIVoiceId.Alloy, name: "Giọng pha", description: "Trung lập, chuyên nghiệp và rõ ràng" },
	{ id: OpenAIVoiceId.Echo, name: "Giọng vang", description: "Ấm áp, thân thiện và hấp dẫn" },
	{ id: OpenAIVoiceId.Fable, name: "Giọng ngụ ngôn", description: "Năng động, biểu cảm và hấp dẫn" },
	{ id: OpenAIVoiceId.Onyx, name: "Giọng chín chắn", description: "Lớn tuổi, chín chắn, và có kinh nghiệm" },
	{ id: OpenAIVoiceId.Nova, name: "Giọng năng động", description: "Trẻ, năng động và cuốn hút" },
	{ id: OpenAIVoiceId.Shimmer, name: "Giọng sáng tạo", description: "Sống động, sôi nổi và năng động" },
];

// Config types for the ConvertToSpeech
type CTSSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3 | 3.5 | 4;
type CTSConfig = {
	maxTextLength?: number;
	model: CTSModel;
	speed: CTSSpeed;
};
const CTSDefaultConfig: CTSConfig = {
	maxTextLength: 200,
	model: OpenAITTSModel.TTS1,
	speed: 1,
};

// CTS response
type CTSResponse = {
	id: string;
	input: string;
	stream: string;
	download: string;
};

export { OpenAITTSModel, OpenAIVoiceId, GoogleVoiceId, CTSDefaultConfig, CTSVoices };
export type { CTSInput, CTSModel, CTSVoiceId, CTSConfig, CTSSpeed, CTSVoice, CTSResponse };
