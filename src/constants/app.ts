import { SvgName } from "~/components/icon/svg";

const ContactEmail = process.env.CONTACT_EMAIL;
const InstructionVideoId = "pBdVzoHtS3c";

const SOCIAL_NETWORKS: { name: string; url: string; icon: SvgName }[] = [
	// { name: "Facebook", url: "https://www.facebook.com/", icon: "facebook" },
	{ name: "YouTube", url: "https://www.youtube.com/channel/UCOViq6_NuW50T7QGtuAe-bQ", icon: "youtube" },
];

export { ContactEmail, InstructionVideoId, SOCIAL_NETWORKS };
