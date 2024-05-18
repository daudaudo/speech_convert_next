import { redirect } from "next/navigation";
import { PagePath } from "~/enums/path";

const Page = async () => {
	return redirect(PagePath.textToSpeech);
};

export default Page;
