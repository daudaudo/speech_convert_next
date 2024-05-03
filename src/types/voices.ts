export type VoiceType = {
	id: string;
	name: string;
	description: string;
};

// Tạm thời fix cứng, sau này sẽ lấy từ API
export const OpenAIVoice: VoiceType[] = [
	{ id: "alloy", name: "Giọng pha", description: "Trung lập, chuyên nghiệp và rõ ràng" },
	{ id: "echo", name: "Giọng vang", description: "Ấm áp, thân thiện và hấp dẫn" },
	{ id: "fable", name: "Giọng ngụ ngôn", description: "Năng động, biểu cảm và hấp dẫn" },
	{ id: "onyx", name: "Giọng chín chắn", description: "Lớn tuổi, chín chắn, và có kinh nghiệm" },
	{ id: "nova", name: "Giọng năng động", description: "Trẻ, năng động và cuốn hút" },
	{ id: "shimmer", name: "Giọng sáng tạo", description: "Sống động, sôi nổi và năng động" },
];
