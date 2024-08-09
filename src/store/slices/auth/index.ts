import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApiActions from "~/store/slices/auth/authApiActions";
import { UserResponseData } from "~/types/response/user";

type UserData = Omit<UserResponseData, "_id" | "created_at" | "updated_at">;

export interface AuthState {
	user?: UserData;
	authencated: boolean;
	loading: boolean;
	error: boolean;
}

const initialState: AuthState = {
	authencated: false,
	loading: false,
	error: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserData>) => {
			return { user: action.payload, authencated: true, loading: false, error: false };
		},
		updateBalance: (state, action: PayloadAction<number>) => {
			if (state.user) {
				state.user.balance = action.payload;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// login
			.addCase(authApiActions.login.pending, (state) => {
				state.loading = true;
				state.authencated = false;
				state.error = false;
			})
			.addCase(authApiActions.login.fulfilled, (state, action: PayloadAction<{ user: UserResponseData }>) => {
				state.loading = false;
				state.user = action.payload.user;
				state.authencated = true;
			})
			.addCase(authApiActions.login.rejected, (state) => {
				state.loading = false;
				state.authencated = false;
				state.error = true;
			})
			// loginByGoogle
			.addCase(authApiActions.loginByGoogle.pending, (state) => {
				state.loading = true;
				state.authencated = false;
				state.error = false;
			})
			.addCase(authApiActions.loginByGoogle.fulfilled, (state, action: PayloadAction<{ user: UserResponseData }>) => {
				state.loading = false;
				state.user = action.payload.user;
				state.authencated = true;
			})
			.addCase(authApiActions.loginByGoogle.rejected, (state) => {
				state.loading = false;
				state.authencated = false;
				state.error = true;
			})
			// register
			.addCase(authApiActions.register.pending, (state) => {
				state.loading = true;
				state.authencated = false;
				state.error = false;
			})
			.addCase(authApiActions.register.fulfilled, (state, action: PayloadAction<{ user: UserResponseData }>) => {
				state.loading = false;
				state.user = action.payload.user;
				state.authencated = true;
			})
			.addCase(authApiActions.register.rejected, (state) => {
				state.loading = false;
				state.authencated = false;
				state.error = true;
			})
			// logout
			.addCase(authApiActions.logout.pending, (state) => {
				state.loading = true;
				state.authencated = false;
			})
			.addCase(authApiActions.logout.fulfilled, (state) => {
				state.loading = false;
				state.user = undefined;
			})
			.addCase(authApiActions.logout.rejected, (state) => {
				state.loading = false;
			});
	},
});

// Action creators are generated for each case reducer function
const authUiActions = authSlice.actions;
const authActions = { ...authUiActions, ...authApiActions };
export { authActions };

const AuthReducer = authSlice.reducer;
export default AuthReducer;
