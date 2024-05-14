import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";

type CTSType = "text" | "document" | "conversation";
// Input types for the ConvertToSpeech
type CTSInput = {
	text: string;
	file?: File | null;
};

// Model types for the ConvertToSpeech
type CTSModel = OpenAITTSModel;

// Voice types for the ConvertToSpeech
type CTSVoiceId = OpenAIVoiceId;

// Voice data for the ConvertToSpeech
// Get it from api later
type CTSVoice = {
	id: CTSVoiceId;
	name: string;
	description: string;
};
const CTSVoices: CTSVoice[] = [
	{ id: OpenAIVoiceId.Alloy, name: "Nam chuyên nghiệp", description: "Trung lập, chuyên nghiệp và rõ ràng" },
	{ id: OpenAIVoiceId.Echo, name: "Nam thân thiện", description: "Ấm áp, thân thiện và hấp dẫn" },
	{ id: OpenAIVoiceId.Fable, name: "Nam biểu cảm", description: "Năng động, biểu cảm và hấp dẫn" },
	{ id: OpenAIVoiceId.Onyx, name: "Nam chín chắn", description: "Lớn tuổi, chín chắn, và có kinh nghiệm" },
	{ id: OpenAIVoiceId.Nova, name: "Nữ năng động", description: "Trẻ, năng động và cuốn hút" },
	{ id: OpenAIVoiceId.Shimmer, name: "Nữ sáng tạo", description: "Sống động, sôi nổi và năng động" },
];

// Config types for the ConvertToSpeech
type CTSSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.25 | 2.5 | 2.75 | 3 | 3.25 | 3.5 | 3.75 | 4;
type CTSConfig = {
	maxTextLength?: number;
	fileAccept?: string[];
	maxFileSize?: number;
};
const CTSDefaultConfig: CTSConfig = {
	maxTextLength: 2048,
	maxFileSize: 2 * 1024 * 1024, // 2MB
	fileAccept: [".txt"],
};

// Output types for the ConvertToSpeech
type CTSOutput = {
	id: string;
	input?: string;
	streamUrl: string;
	downloadUrl: string;
	voiceId?: CTSVoiceId;
	model?: CTSModel;
	speed?: CTSSpeed;
};

type CTSError = {
	[key in CTSType]?: string;
};

export { CTSDefaultConfig, CTSVoices };
export type { CTSType, CTSInput, CTSModel, CTSVoiceId, CTSConfig, CTSSpeed, CTSVoice, CTSOutput, CTSError };
