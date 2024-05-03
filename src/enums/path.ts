export enum PagePath {
	// Auth Pages
	signin = "/signin",
	signup = "/signup",
	accountRecovery = "/account-recovery",

	// Home Pages: auto navigate to /text-to-speech
	// Change this in file next.config.mjs
	home = "/",

	// Convert to  Pages
	textToSpeech = "/text-to-speech",
	documentToSpeech = "/document-to-speech",
	conversationToSpeech = "/conversation-to-speech",

	// Convert to Text Pages
	speechToText = "/speech-to-text",

	// History Page
	history = "/history",
}
