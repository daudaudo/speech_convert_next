import { UserResponseData } from "~/types/response/user";

export type AuthenticatedUser = {
	[Property in keyof UserResponseData]: UserResponseData[Property];
};
