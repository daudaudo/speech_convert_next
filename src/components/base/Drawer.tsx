import React from "react";
import { Drawer, DrawerProps } from "@material-tailwind/react";

// override Drawer component.
const DrawerBase = (props: DrawerProps) => (
	<Drawer {...props} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
);

export default DrawerBase;
