/**
 * This file is used to override the types of the components from the material-tailwind library.
 * For fixing the issue: https://github.com/creativetimofficial/material-tailwind/issues/651
 * Remove this file if the issue is fixed in the library.
 */

import {
	ButtonProps as OriginalButtonProps,
	DialogBodyProps as OriginalDialogBodyProps,
	DialogFooterProps as OriginalDialogFooterProps,
	DialogHeaderProps as OriginalDialogHeaderProps,
	DialogProps as OriginalDialogProps,
	DrawerProps as OriginalDrawerProps,
	InputProps as OriginalInputProps,
	SelectProps as OriginalSelectProps,
} from "@material-tailwind/react";

type MuiOverrideProps = {
	placeholder?: unknown;
	onPointerEnterCapture?: unknown;
	onPointerLeaveCapture?: unknown;
};

declare module "@material-tailwind/react" {
	// Button, Input, Select
	export interface ButtonProps extends OriginalButtonProps, MuiOverrideProps {}
	export interface InputProps extends OriginalInputProps, MuiOverrideProps {}
	export interface SelectProps extends OriginalSelectProps, MuiOverrideProps {}
	// Drawer
	export interface DrawerProps extends OriginalDrawerProps, MuiOverrideProps {}
	// Dialog
	export interface DialogProps extends OriginalDialogProps, MuiOverrideProps {}
	export interface DialogHeaderProps extends OriginalDialogHeaderProps, MuiOverrideProps {}
	export interface DialogBodyProps extends OriginalDialogBodyProps, MuiOverrideProps {}
	export interface DialogFooterProps extends OriginalDialogFooterProps, MuiOverrideProps {}
}
