"use client";

import React from "react";
import Link from "next/link";
import { Button, Flex, Layout, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DarkModeButton from "~/components/DarkModeButton";
import { useTheme } from "~/contexts/themeContext";
const { Header, Content } = Layout;

const AuthLayout = ({ children }: React.PropsWithChildren) => {
	const { token } = useTheme();

	return (
		<Flex style={{ height: "100vh", flexDirection: "column", backgroundColor: token.colorBgBase }}>
			<Header style={{ backgroundColor: token.colorBgBase }}>
				<Flex justify="space-between" align="center">
					<Link href="/">
						<Button type="text" icon={<ArrowLeftOutlined color={token.colorTextSecondary} />}>
							<Typography.Text style={{ color: token.colorTextSecondary, fontWeight: 700 }}>
								Quay về trang chủ
							</Typography.Text>
						</Button>
					</Link>
					<Flex gap={token.marginXS}>
						<DarkModeButton />
						{/* Todo TruongNBN: Add select language here later  */}
					</Flex>
				</Flex>
			</Header>
			<Content style={{ flex: 1, minHeight: "max-content" }}>
				<Flex justify="center" align="middle">
					{children}
				</Flex>
			</Content>
		</Flex>
	);
};

export default AuthLayout;
