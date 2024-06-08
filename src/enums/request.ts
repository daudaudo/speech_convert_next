enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

enum RequestUrl {
	home = "/",
	// authen
	signin = "auth/login",
	signup = "auth/register",
	signinGoogleCallback = "oauth/google/callback",
	signinGoogle = "oauth/google/login",
	// user
	getUser = "user",
	// converter
	convertToSpeech = "audio/speech",
	convertToConversation = "audio/conversations",
	convertToText = "audio/transcriptions",
	// history
	speechHistory = "audio/speech/history",
	textHistory = "audio/transcriptions/history",
	conversationHistory = "audio/conversations/history",
}

export { RequestMethod, RequestUrl };
