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

	// History Page
	speechHistory = "/history/speech",
	conversationHistory = "/history/conversation",
	textHistory = "/history/text",
}

export const AuthPaths = [PagePath.signin, PagePath.signup];
export const HomePaths = [PagePath.home];
export const CTSPaths = [PagePath.textToSpeech, PagePath.documentToSpeech, PagePath.conversationToSpeech];
export const CTTPaths = [PagePath.speechToText, PagePath.documentToText];
export const HistoryPaths = [PagePath.speechHistory, PagePath.conversationHistory, PagePath.textHistory];

export const isAuthPage = (pathname: string) =>
	pathname === PagePath.home ? false : AuthPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isHomePage = (pathname: string) =>
	pathname === PagePath.home ? false : HomePaths.some((pagePath) => pagePath.startsWith(pathname));
export const isCTSPage = (pathname: string) =>
	pathname === PagePath.home ? false : CTSPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isCTTPage = (pathname: string) =>
	pathname === PagePath.home ? false : CTTPaths.some((pagePath) => pagePath.startsWith(pathname));
export const isHistoryPage = (pathname: string) =>
	pathname === PagePath.home ? false : HistoryPaths.some((pagePath) => pagePath.startsWith(pathname));
