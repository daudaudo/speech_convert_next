import { AppError } from "~/errors/app";

export class LogicError extends AppError {
	constructor(message?: string) {
		super(message || "Logic Error");
		this.name = "logic_error";
	}
}

export class NotImplementedLogicError extends LogicError {
	constructor(message?: string) {
		super(message || "Not Implemented Logic Error");
		this.name = "not_implemented_logic_error";
	}
}
