const CTSConfig: {
	maxTextLength: number;
	fileAccept: string[];
	maxFileSize: number;
} = {
	maxTextLength: 2048,
	maxFileSize: 2 * 1024 * 1024, // 2MB
	fileAccept: [".txt"],
};

export default CTSConfig;
