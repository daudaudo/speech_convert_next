export class AppError extends Error {
	constructor(message?: string) {
		super(message || "App Error");
	}
}

export class MissingEnviromentError extends AppError {
	constructor(key: string) {
		super(`The key ${key} must be setting in .env file.`);
	}
}
