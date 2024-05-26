import { LogicError } from "~/errors/logic";

export class UnauthorizedError extends LogicError {
	public constructor(message?: string) {
		super(message);
		this.name = "unauthorized_error";
	}
}

export class MissingTokenInCookieError extends UnauthorizedError {
	public constructor(message?: string) {
		super(message);
		this.name = "missing_token_in_cookie_error";
	}
}

export class MissingJWTInHeaderError extends UnauthorizedError {
	public constructor(message?: string) {
		super(message);
		this.name = "missing_jwt_in_cookie_error";
	}
}
