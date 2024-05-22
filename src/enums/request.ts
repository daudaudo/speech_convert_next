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
	convertToText = "audio/transcriptions",
	// history
	CTSHistory = "audio/speech/history",
	CTTHistory = "audio/transcriptions/history",
}

export { RequestMethod, RequestUrl };
