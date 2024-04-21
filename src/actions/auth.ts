import { callApiAction } from "./utils";

async function onSignin(email: string, password: string) {
	return callApiAction("auth/login", "POST", { email, password });
}

async function onSignup(username: string, email: string, password: string) {
	return callApiAction("auth/register", "POST", { username, email, password });
}

const authActions = {
	onSignin,
	onSignup,
};

export default authActions;
