import React from "react";
import {
	Dialog,
	DialogBody,
	DialogBodyProps,
	DialogFooter,
	DialogFooterProps,
	DialogHeader,
	DialogHeaderProps,
	DialogProps,
} from "@material-tailwind/react";

// override Dialog component.
// fix bug of @type/react ^20
const DialogBase = (props: DialogProps) => (
	<Dialog {...props} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
);
const DialogBaseHeader = (props: DialogHeaderProps) => (
	<DialogHeader
		{...props}
		placeholder={undefined}
		onPointerEnterCapture={undefined}
		onPointerLeaveCapture={undefined}
	/>
);
const DialogBaseBody = (props: DialogBodyProps) => (
	<DialogBody {...props} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
);
const DialogBaseFooter = (props: DialogFooterProps) => (
	<DialogFooter
		{...props}
		placeholder={undefined}
		onPointerEnterCapture={undefined}
		onPointerLeaveCapture={undefined}
	/>
);
DialogBase.Header = DialogBaseHeader;
DialogBase.Body = DialogBaseBody;
DialogBase.Footer = DialogBaseFooter;

export default DialogBase;
