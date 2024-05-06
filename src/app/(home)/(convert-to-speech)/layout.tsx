import React from "react";
import CTSNavbar from "~/components/utils/CTSNavbar";
import VoiceForm from "~/components/VoiceForm";

interface Props {
	children: React.ReactNode;
}
const ConvertToSpeechLayout = ({ children }: Props) => {
	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-1 pb-44 md:pb-8 mt-4">
				<div className="relative h-full px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 content-stretch transition-all duration-200">
					<div className="lg:col-span-2 transition-all duration-200 flex flex-col space-y-6 h-full">
						<div className="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 relative w-full flex-1">
							<div className="h-full px-4 py-5 sm:p-6 !p-0">
								<div className="relative px-0 rounded-lg h-full">
									<div className="flex flex-col h-full">
										<CTSNavbar />
										{children}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex-grow h-full transition-all duration-200">
						<VoiceForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConvertToSpeechLayout;