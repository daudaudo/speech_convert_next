/**
 * This file is used to override the types of the components from the material-tailwind library.
 * For fixing the issue: https://github.com/creativetimofficial/material-tailwind/issues/651
 * Remove this file if the issue is fixed in the library.
 */

import {
	AccordionHeaderProps as OriginalAccordionHeaderProps,
	AccordionProps as OriginalAccordionProps,
	ButtonGroupProps as OriginalButtonGroupProps,
	ButtonProps as OriginalButtonProps,
	CardProps as OriginalCardProps,
	CarouselProps as OriginalCarouselProps,
	DialogBodyProps as OriginalDialogBodyProps,
	DialogFooterProps as OriginalDialogFooterProps,
	DialogHeaderProps as OriginalDialogHeaderProps,
	DialogProps as OriginalDialogProps,
	DrawerProps as OriginalDrawerProps,
	IconButtonProps as OriginalIconButtonProps,
	InputProps as OriginalInputProps,
	ListItemPrefixProps as OriginalListItemPrefixProps,
	ListItemProps as OriginalListItemProps,
	ListItemSuffixProps as OriginalListItemSuffixProps,
	ListProps as OriginalListProps,
	NavbarProps as OriginalNavbarProps,
	PopoverContentProps as OriginalPopoverContentProps,
	SelectProps as OriginalSelectProps,
	TextareaProps as OriginalTextareaProps,
} from "@material-tailwind/react";

type MuiOverrideProps = {
	placeholder?: unknown;
	onPointerEnterCapture?: unknown;
	onPointerLeaveCapture?: unknown;
};

declare module "@material-tailwind/react" {
	// Button
	export interface ButtonProps extends OriginalButtonProps, MuiOverrideProps {}
	export interface ButtonGroupProps extends OriginalButtonGroupProps, MuiOverrideProps {}
	// Input, Select
	export interface IconButtonProps extends OriginalIconButtonProps, MuiOverrideProps {}
	export interface InputProps extends OriginalInputProps, MuiOverrideProps {}
	export interface SelectProps extends OriginalSelectProps, MuiOverrideProps {}
	// Drawer
	export interface DrawerProps extends OriginalDrawerProps, MuiOverrideProps {}
	// Dialog
	export interface DialogProps extends OriginalDialogProps, MuiOverrideProps {}
	export interface DialogHeaderProps extends OriginalDialogHeaderProps, MuiOverrideProps {}
	export interface DialogBodyProps extends OriginalDialogBodyProps, MuiOverrideProps {}
	export interface DialogFooterProps extends OriginalDialogFooterProps, MuiOverrideProps {}
	// Card
	export interface CardProps extends OriginalCardProps, MuiOverrideProps {}
	// List
	export interface ListProps extends OriginalListProps, MuiOverrideProps {}
	export interface ListItemProps extends OriginalListItemProps, MuiOverrideProps {}
	export interface ListItemSuffixProps extends OriginalListItemSuffixProps, MuiOverrideProps {}
	export interface ListItemPrefixProps extends OriginalListItemPrefixProps, MuiOverrideProps {}
	// Popover
	export interface PopoverContentProps extends OriginalPopoverContentProps, MuiOverrideProps {}
	// Navbar
	export interface NavbarProps extends OriginalNavbarProps, MuiOverrideProps {}
	// Carousel
	export interface CarouselProps extends OriginalCarouselProps, MuiOverrideProps {}
	// Textarea
	export interface TextareaProps extends OriginalTextareaProps, MuiOverrideProps {}
	// Accordion
	export interface AccordionProps extends OriginalAccordionProps, MuiOverrideProps {}
	export interface AccordionHeaderProps extends OriginalAccordionHeaderProps, MuiOverrideProps {}
}
