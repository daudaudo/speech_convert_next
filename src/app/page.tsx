// import React from "react";
import { redirect } from "next/navigation";
import { PagePath } from "~/enums/path";
// import HomePage from "~/components/home/HomePage";

const Page = async () => {
	redirect(PagePath.textToSpeech);
	// return (
	// 	<div className="h-screen mx-auto">
	// 		{/* <HomePage /> */}
	// 		Home
	// 	</div>
	// );
};

export default Page;
