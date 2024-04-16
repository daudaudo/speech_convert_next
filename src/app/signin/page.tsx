"use client";

import { LoginOutlined } from "@ant-design/icons";
import { Flex, theme, Typography } from "antd";
import Link from "next/link";
import React from "react";
import SigninForm, { FieldType } from "~/components/SigninForm";

const SigninPage = () => {
	const { token } = theme.useToken();

	const onFinish = (data: FieldType) => {
		const { username, password } = data;
		console.log(data);
		// Todo TruongNBN: Add login logic here later
	};

	return (
		<Flex
			style={{
				flexDirection: "column",
				minWidth: 400,
				height: "fit-content",
				padding: token.paddingSM,
				backgroundColor: token.colorBgContainer,
				borderRadius: token.borderRadiusSM,
				boxShadow: token.boxShadowSecondary,
			}}
		>
			<Typography.Title level={3} style={{ color: token.blue, textAlign: "center" }}>
				<LoginOutlined style={{ marginRight: token.marginXS }} />
				Đăng nhập
			</Typography.Title>
			<Flex justify="center" style={{ marginTop: token.marginSM, width: "100%" }}>
				<SigninForm onFinish={onFinish} />
			</Flex>
			<Typography.Text style={{ color: token.colorTextSecondary }}>
				<Link href="/account-recovery">Quên mật khẩu</Link>
			</Typography.Text>
			<Typography.Text style={{ color: token.colorTextSecondary }}>
				Bạn không có tài khoản?&nbsp;
				<Link href="/signup">Đăng ký</Link>
			</Typography.Text>
		</Flex>
	);
};

export default SigninPage;
