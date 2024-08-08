import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	value: number;
}

const initialState: AuthState = {
	value: 0,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
const { increment, decrement, incrementByAmount } = authSlice.actions;
const AuthActions = { increment, decrement, incrementByAmount };
export { AuthActions };

const AuthReducer = authSlice.reducer;
export default AuthReducer;
