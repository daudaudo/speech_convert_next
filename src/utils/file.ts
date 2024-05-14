import { FileSizeUnit } from "~/enums/file";
import { AppError } from "~/errors/app";

export const convertBytes = (bytes: number, targetUnit?: FileSizeUnit) => {
	const units = Object.values(FileSizeUnit);
	const index = units.indexOf(targetUnit ?? FileSizeUnit.MEGABYTE);

	if (index === -1) {
		throw new AppError("Invalid target unit");
	}

	let size = bytes;
	for (let i = 0; i < index; i++) {
		size /= 1024;
	}

	return size.toFixed(2) + " " + units[index];
};
