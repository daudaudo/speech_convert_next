"use client";

import React, { useCallback, useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTheme } from "~/contexts/themeContext";
import authActions from "~/actions/auth";
import { PagePath } from "~/enums/path";

type SigninFieldType = {
	email: string;
	password: string;
};

const SigninForm = () => {
	const { token } = useTheme();
	const [form] = Form.useForm();
	const [submitState, setSubmitState] = useState({ loading: false, error: "" });

	const onSignin = useCallback(async (email: string, password: string) => {
		setSubmitState({ loading: true, error: "" });
		const signinRes = await authActions.onSignin(email, password);
		if (signinRes.success) {
			const access_token = signinRes?.data?.access_token;
			console.log("access_token", access_token);
			setSubmitState({ loading: false, error: "" });
		} else setSubmitState({ loading: false, error: signinRes.message });
	}, []);

	const onFinish = useCallback(
		(values: SigninFieldType) => {
			const { email, password } = values;
			onSignin(email, password);
		},
		[onSignin],
	);

	return (
		<Flex
			style={{
				flexDirection: "column",
				width: 400,
				height: "fit-content",
				padding: token.paddingSM,
				backgroundColor: token.colorBgContainer,
				borderRadius: token.borderRadiusSM,
				boxShadow: token.boxShadowSecondary,
				// opacity: token.opacityLoading,
			}}
		>
			<Typography.Title level={3} style={{ color: token.blue, textAlign: "center" }}>
				<LoginOutlined style={{ marginRight: token.marginXS }} />
				Đăng nhập
			</Typography.Title>
			<Flex justify="center" style={{ marginTop: token.marginSM, width: "100%" }}>
				<Form
					form={form}
					name="signin"
					onFinish={onFinish}
					layout="vertical"
					labelCol={{ span: 24, style: { fontWeight: 600, color: token.colorTextSecondary } }}
					style={{ width: "100%" }}
					colon={false}
					validateTrigger={["onSubmit", "onBlur"]}
				>
					<Form.Item<SigninFieldType>
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "" },
							{ type: "email", message: "Email không hợp lệ." },
						]}
					>
						<Input placeholder="Nhập email của bạn" autoFocus />
					</Form.Item>
					<Form.Item<SigninFieldType> name="password" label="Mật khẩu" rules={[{ required: true, message: "" }]}>
						<Input.Password placeholder="Nhập mật khẩu của bạn" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
			</Flex>
			{/* <Typography.Text style={{ color: token.colorTextSecondary }}>
				<Link href={PagePath.accountRecovery}>Quên mật khẩu?</Link>
			</Typography.Text> */}
			<Typography.Text style={{ color: token.colorTextSecondary }}>
				Bạn không có tài khoản?&nbsp;
				<Link href={PagePath.signup}>Đăng ký</Link>.
			</Typography.Text>
		</Flex>
	);
};

export default SigninForm;
