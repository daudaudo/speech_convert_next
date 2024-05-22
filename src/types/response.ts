import { ResponseStatus } from "~/enums/response";

type ResponseType = {
	success: boolean;
	message: string | null;
	status: ResponseStatus;
	data?: object;
};

export type { ResponseType };
