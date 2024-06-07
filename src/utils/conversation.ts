import { User } from "~/types/CTSTypes";

const generateUniqueName = (users: User[]) => {
	let name = `User ${users.length + 1}`;
	while (users.some((user) => user.name === name)) {
		name = `User ${parseInt(name.split(" ")[1]) + 1}`;
	}
	return name;
};

export { generateUniqueName };
