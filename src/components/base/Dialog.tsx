import React from "react";
import {
	DialogBodyProps,
	DialogFooterProps,
	DialogHeaderProps,
	DialogProps,
	Dialog as MuiDialog,
	DialogBody as MuiDialogBody,
	DialogFooter as MuiDialogFooter,
	DialogHeader as MuiDialogHeader,
} from "@material-tailwind/react";

// override Dialog component.
// Bug: https://github.com/creativetimofficial/material-tailwind/issues/651
const Dialog = (props: DialogProps) => <MuiDialog {...props} />;
const DialogBaseHeader = (props: DialogHeaderProps) => <MuiDialogHeader {...props} />;
const DialogBaseBody = (props: DialogBodyProps) => <MuiDialogBody {...props} />;
const DialogBaseFooter = (props: DialogFooterProps) => <MuiDialogFooter {...props} />;
Dialog.Header = DialogBaseHeader;
Dialog.Body = DialogBaseBody;
Dialog.Footer = DialogBaseFooter;

export default Dialog;
