import { AppError } from "./app";

class ContextError extends AppError {
	constructor(name?: string) {
		const msg = `${name || "Context"} must be used within a Provider`;
		super(msg);
	}
}

export default ContextError;
