"use client";

import React from "react";
import Link from "next/link";
import { Button, Flex, Layout, theme, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

interface SigninLayoutProps {
	children?: React.ReactNode;
}

const SigninLayout = ({ children }: SigninLayoutProps) => {
	const { token } = theme.useToken();

	return (
		<>
			<Header style={{ backgroundColor: token.colorBgBase }}>
				<Flex justify="space-between" align="center">
					<Link href="/">
						<Button type="text" icon={<ArrowLeftOutlined color={token.colorTextSecondary} />}>
							<Typography.Text style={{ color: token.colorTextSecondary, fontWeight: 700 }}>
								Quay về trang chủ
							</Typography.Text>
						</Button>
					</Link>
					{/* Todo TruongNBN: Add settinng button here later */}
					{/* <DarkModeButton /> */}
				</Flex>
			</Header>
			<Content style={{ backgroundColor: token.colorBgBase }}>
				<Flex justify="center" align="middle" style={{ height: "100vh" }}>
					{children}
				</Flex>
			</Content>
		</>
	);
};

export default SigninLayout;
