import { AppError } from "~/errors/app";

export class LogicError extends AppError {
	constructor(message?: string) {
		super(message || "Logic Error");
		this.name = "logic_error";
	}
}
