import { format, parseISO } from "date-fns";

function formatDate(isoString: string, formatStr?: string) {
	const date = parseISO(isoString);
	return format(date, formatStr ?? "dd/MM/yyyy HH:mm");
}

export default formatDate;
