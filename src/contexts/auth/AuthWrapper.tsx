"use server";

import React from "react";
import { getAuthUserUseJwtHeader } from "~/actions/usecase/auth/user";
import { AuthProvider } from "~/contexts/auth/AuthContext";

interface Props {
	children: React.ReactNode;
}

const AuthWrapper = async ({ children }: Props) => {
	const user = await (async () => {
		try {
			return await getAuthUserUseJwtHeader();
		} catch {
			return undefined;
		}
	})();

	return <AuthProvider user={user}>{children}</AuthProvider>;
};

export default AuthWrapper;
