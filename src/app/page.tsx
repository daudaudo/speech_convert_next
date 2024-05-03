import { useRouter } from "next/navigation";
import { PagePath } from "~/enums/path";

const Index = () => {
	const router = useRouter();
	router.push(PagePath.sound);
};

export default Index;
