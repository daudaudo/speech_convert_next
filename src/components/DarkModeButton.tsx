import { Button, theme, Tooltip } from "antd";
import React, { useMemo } from "react";
import { Moon, PartlySunny } from "react-ionicons";
import { useAntd } from "~/contexts/antdContext";

const DarkModeButton = () => {
	const { token } = theme.useToken();
	const { isDark, toggleDark } = useAntd();

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
