import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUseCredentials, registerUseCredentials } from "~/actions/data/auth";
import { getAuthUser } from "~/actions/data/auth/user";
import { fetchLoginByGoogle } from "~/actions/data/oauth/google";
import { createSession, deleteSession } from "~/actions/cookies/session";

const ACTIONS = {
	LOGIN: "auth/login",
	LOGIN_BY_GOOGLE: "auth/loginByGoogle",
	REGISTER: "auth/register",
	LOGOUT: "auth/logout",
};

const login = createAsyncThunk(
	ACTIONS.LOGIN,
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const { access_token } = await loginUseCredentials(payload.email, payload.password);
			await createSession(access_token);
			const user = await getAuthUser(access_token);
			return { user };
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const loginByGoogle = createAsyncThunk(
	ACTIONS.LOGIN_BY_GOOGLE,
	async (payload: { code: string }, { rejectWithValue }) => {
		try {
			const { access_token } = await fetchLoginByGoogle(payload);
			await createSession(access_token);
			const user = await getAuthUser(access_token);
			return { user };
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const register = createAsyncThunk(
	ACTIONS.REGISTER,
	async (payload: { username: string; email: string; password: string }, { rejectWithValue }) => {
		try {
			const { access_token } = await registerUseCredentials(payload);
			await createSession(access_token);
			const user = await getAuthUser(access_token);
			return { user };
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	},
);

const logout = createAsyncThunk(ACTIONS.LOGOUT, async (payload: undefined, { rejectWithValue }) => {
	try {
		await deleteSession();
	} catch (error: any) {
		return rejectWithValue(error.message as string);
	}
});

const authApiActions = {
	login,
	loginByGoogle,
	register,
	logout,
};

export default authApiActions;
