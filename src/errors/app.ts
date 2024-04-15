export class AppError extends Error {
	constructor(message?: string) {
		super(message || "App Error");
	}
}
