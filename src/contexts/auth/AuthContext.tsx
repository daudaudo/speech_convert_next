"use client";

import React, { useState } from "react";
import { getAuthUserByTokenCookie } from "~/actions/usecase/auth/user";
import { removeToken } from "~/actions/cookies/auth";
import { AuthenticatedUser } from "~/types/auth";

type AuthContext = {
	signout?(): Promise<any>;
	signin?(): Promise<any>;
	user?: AuthenticatedUser;
};

const Context = React.createContext<AuthContext>({});

interface Props {
	children: React.ReactNode;
	user?: AuthenticatedUser;
}

export const AuthProvider = ({ children, user: initUser }: Props) => {
	const [user, setUser] = useState<AuthenticatedUser | undefined>(initUser);

	const signout = async () => {
		try {
			await removeToken();
			setUser(undefined);
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
	const context = React.useContext(Context);

	return context;
};
