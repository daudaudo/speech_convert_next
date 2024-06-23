const CTSConfig: {
	maxTextLength: number;
	fileAccept: string[];
	maxFileSize: number;
	maxUserConversation: number;
} = {
	maxTextLength: 2048,
	maxFileSize: 2 * 1024 * 1024, // 2MB
	fileAccept: [".txt"],
	maxUserConversation: 5,
};

const CTTConfig: {
	maxTextLength?: number;
	fileAccept?: string[];
	maxFileSize?: number;
} = {
	maxTextLength: 2048,
	maxFileSize: 10 * 1024 * 1024, // 10MB
	fileAccept: [".mp3", ".wav", ".occ", ".ogg"],
};

const HistoryConfig: {
	DEFAULT_PAGE: number;
	DEFAULT_LIMIT: number;
} = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 10,
};

export { CTSConfig, HistoryConfig, CTTConfig };
