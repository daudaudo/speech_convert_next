import { callApiAction } from "./utils";

async function onSignin(email: string, password: string) {
	return callApiAction("auth/login", "POST", { email, password });
}

async function onSignup(name: string, email: string, password: string) {
	return callApiAction("auth/register", "POST", { name, email, password });
}

const authActions = {
	onSignin,
	onSignup,
};

export default authActions;
