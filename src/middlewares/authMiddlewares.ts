import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMeUserLooader } from "~/actions/getMeUser";
import { PagePath } from "~/enums/path";

const authenticate = (required?: boolean) => {
	return async (request: NextRequest) => {
		try {
			const user = await getMeUserLooader();
			if (!user.success && required) {
				return NextResponse.redirect(new URL(PagePath.signin, request.url));
			}
		} catch (error) {
			return NextResponse.next();
		}
	};
};

const AuthMiddleware = {
	required: authenticate(true),
	orNot: authenticate(),
	authenticate,
};

export default AuthMiddleware;
