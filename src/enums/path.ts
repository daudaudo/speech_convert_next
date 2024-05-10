export enum PagePath {
	// Auth Pages
	signin = "/signin",
	signup = "/signup",
	accountRecovery = "/account-recovery",

	// Home Pages: auto navigate to /text-to-speech
	// Change this in file next.config.mjs
	home = "/",

	// Convert to Speech Pages
	textToSpeech = "/text-to-speech",
	documentToSpeech = "/document-to-speech",
	conversationToSpeech = "/conversation-to-speech",

	// Convert to Text Pages
	speechToText = "/speech-to-text",
	documentToText = "/document-to-text",
	textToText = "/text-to-text",

	// History Page
	history = "/history",
}

export const AuthPaths = [PagePath.signin, PagePath.signup, PagePath.accountRecovery];
export const HomePaths = [PagePath.home];
export const CTSPaths = [PagePath.textToSpeech, PagePath.documentToSpeech, PagePath.conversationToSpeech];
export const CTTPaths = [PagePath.speechToText, PagePath.documentToText, PagePath.textToText];
export const HistoryPaths = [PagePath.history];

export const isAuthPage = (pathname: string) => AuthPaths.includes(pathname as PagePath);
export const isHomePage = (pathname: string) => HomePaths.includes(pathname as PagePath);
export const isCTSPage = (pathname: string) => CTSPaths.includes(pathname as PagePath);
export const isCTTPage = (pathname: string) => CTTPaths.includes(pathname as PagePath);
export const isHistoryPage = (pathname: string) => HistoryPaths.includes(pathname as PagePath);
