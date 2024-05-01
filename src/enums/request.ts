enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
}

enum RequestUrl {
	signin = "auth/login",
	signup = "auth/register",
}

export { RequestMethod, RequestUrl };
