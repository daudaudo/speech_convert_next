enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

enum RequestUrl {
	home = "/",
	signin = "auth/login",
	signup = "auth/register",
	signinGoogleCallback = "auth/google/callback",
	signinGoogle = "/auth/google/login",
	//
	convertToSpeech = "audio/speech",
	convertToText = "audio/transcriptions",
}

export { RequestMethod, RequestUrl };
