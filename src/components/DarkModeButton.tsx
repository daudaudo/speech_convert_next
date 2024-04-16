import { Button, Tooltip } from "antd";
import React, { useMemo } from "react";
import { Moon, PartlySunny } from "react-ionicons";
import { useTheme } from "~/contexts/themeContext";

const DarkModeButton = () => {
	const { token } = useTheme();
	const { isDark, toggleDark } = useTheme();

	const Icon = useMemo(() => (isDark ? PartlySunny : Moon), [isDark]);

	return (
		<Tooltip title={`Chế độ tối: ${isDark ? "Bật" : "Tắt"}`}>
			<Button
				type="text"
				shape="circle"
				icon={<Icon color={token.yellow} width="20px" height="20px" />}
				onClick={toggleDark}
			/>
		</Tooltip>
	);
};

export default DarkModeButton;
