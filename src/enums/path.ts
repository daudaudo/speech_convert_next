export enum PagePath {
	// Auth Pages
	signin = "/signin",
	signup = "/signup",

	// Services Pages
	googleOauthCb = "/oauth/google/callback",

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

export const AuthPaths = [PagePath.signin, PagePath.signup];
export const HomePaths = [PagePath.home];
export const CTSPaths = [PagePath.textToSpeech, PagePath.documentToSpeech, PagePath.conversationToSpeech];
export const CTTPaths = [PagePath.speechToText, PagePath.documentToText, PagePath.textToText];
export const HistoryPaths = [PagePath.history];

export const isAuthPage = (pathname: string) => AuthPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isHomePage = (pathname: string) => HomePaths.some((pagePath) => pagePath.startsWith(pathname));
export const isCTSPage = (pathname: string) => CTSPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isCTTPage = (pathname: string) => CTTPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isHistoryPage = (pathname: string) => HistoryPaths.some((pagePath) => pagePath.startsWith(pathname));
