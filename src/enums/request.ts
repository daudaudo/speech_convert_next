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
	convertToSpeech = "audio/speech",
	convertToText = "audio/transcriptions",
}

export { RequestMethod, RequestUrl };
