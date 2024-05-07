import React from "react";
import { DrawerProps, Drawer as MuiDrawer } from "@material-tailwind/react";

// override Drawer component.
const Drawer = (props: DrawerProps) => <MuiDrawer {...props} />;

export default Drawer;
