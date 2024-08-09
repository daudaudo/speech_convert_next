"use client";

import React, { createContext, useEffect } from "react";
import { AuthenticatedUser } from "~/types/auth";
import { useAppDispatch } from "~/store/store";
import { authActions } from "~/store/slices/auth";

const Context = createContext({});

interface Props {
	children: React.ReactNode;
	user?: AuthenticatedUser;
}

export const AuthProvider = ({ children, user: initUser }: Props) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!!initUser)
			dispatch(authActions.setUser({ username: initUser.username, email: initUser.email, balance: initUser.balance }));
	}, [initUser]);

	return <Context.Provider value={{}}>{children}</Context.Provider>;
};
