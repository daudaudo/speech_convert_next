import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import CTTNavbar from "~/components/CTT/CTTNavbar";
import SelectLanguage from "~/components/CTT/SelectLanguage";
import CTTSubmitButton from "~/components/CTT/SubmitButton";
import { ConvertToTextProvider } from "~/contexts/ConvertToTextContext";

interface Props {
	children: React.ReactNode;
}

const ConvertToTextLayout = ({ children }: Props) => {
	return (
		<ConvertToTextProvider>
			<div className="flex flex-col h-full w-full md:pb-8 mt-4">
				<div className="shrink-0 sticky top-0 z-20">
					<div className="sticky items-center top-16 border-b border-gray-50 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 flex mb-1">
						<div className="flex-1">
							<CTTNavbar />
						</div>
						<div className="shrink-0">
							<div className="inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
								<ChevronDoubleRightIcon className="h-6 w-6" />
							</div>
						</div>
						<div className="flex-1 text-end">
							<SelectLanguage />
						</div>
					</div>
				</div>
				<div className="flex-1 pb-44 md:pb-0">
					<div className="relative flex-1 h-full grid grid-cols-1 md:grid-cols-2 gap-3 content-stretch">
						<div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600">
							{children}
						</div>
						<CTTSubmitButton />
						<div className="relative flex-grow h-full">
							<div className="flex flex-col h-full max-h-full md:pt-2 px-4 pl-8 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100" />
						</div>
					</div>
				</div>
			</div>
		</ConvertToTextProvider>
	);
};

export default ConvertToTextLayout;
