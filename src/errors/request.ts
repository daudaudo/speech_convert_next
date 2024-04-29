export default class RequestError extends Error {
	constructor(message?: string) {
		super(`Request Error: ${message || "An error occurred while making a request."}`);
	}
}
