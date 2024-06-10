"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUserByTokenCookie } from "~/actions/usecase/auth/user";
import { removeToken } from "~/actions/cookies/auth";
import { AuthenticatedUser } from "~/types/auth";
import { NotImplementedLogicError } from "~/errors/logic";
import { PagePath } from "~/enums/path";

type AuthContext = {
	signout(): Promise<any>;
	signin(): Promise<any>;
	user?: AuthenticatedUser;
};

const Context = createContext<AuthContext>({
	signin: () => Promise.reject(new NotImplementedLogicError()),
	signout: () => Promise.reject(new NotImplementedLogicError()),
});

interface Props {
	children: React.ReactNode;
	user?: AuthenticatedUser;
}

export const AuthProvider = ({ children, user: initUser }: Props) => {
	const router = useRouter();
	const [user, setUser] = useState<AuthenticatedUser | undefined>(initUser);

	const signout = async () => {
		try {
			await removeToken();
			setUser(undefined);
			router.replace(PagePath.signin);
		} catch {}
	};

	const signin = async () => {
		try {
			const user = await getAuthUserByTokenCookie();
			setUser(user);
		} catch {}
	};

	return <Context.Provider value={{ user, signout, signin }}>{children}</Context.Provider>;
};

export const useAuth = () => {
	const context = useContext(Context);

	return context;
};
