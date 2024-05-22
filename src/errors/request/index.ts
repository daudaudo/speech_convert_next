import { AppError } from "~/errors/app";

export class FailedRequestError extends AppError {
	constructor(message?: string) {
		super(message);
	}
}

export class RequestTimeoutError extends AppError {
	constructor(message?: string) {
		super(message || "Request timeout Error");
	}
}
