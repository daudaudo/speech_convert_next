export class AppError extends Error {
	constructor(message?: string) {
		super(message || "App Error");
		this.name = "app_error";
	}
}

export class MissingEnviromentError extends AppError {
	constructor(key: string) {
		super(`The key ${key} must be setting in .env file.`);
		this.name = "missing_enviroment_error";
	}
}
