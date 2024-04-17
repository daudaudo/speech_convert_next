"use client";

import { UserAddOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";
import authActions from "~/actions/auth";
import { useTheme } from "~/contexts/themeContext";
import { PagePath } from "~/enums/path";

type SignupFieldType = {
	name: string;
	email: string;
	password: string;
	verifyPassword: string;
};

const SignupForm = () => {
	const { token } = useTheme();
	const [form] = Form.useForm();

	const onFinish = useCallback(
		async (values: SignupFieldType) => {
			const { name, email, password, verifyPassword } = values;
			if (password !== verifyPassword) {
				form.setFields([
					{
						name: "verifyPassword",
						errors: ["Mật khẩu xác nhận không khớp."],
					},
				]);
			} else {
				if (name && email && password && verifyPassword) {
					const res = await authActions.onSignup(name, email, password);
					console.log("signup", res);
				} else form.validateFields();
			}
		},
		[form],
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
			}}
		>
			<Typography.Title level={3} style={{ color: token.blue, textAlign: "center" }}>
				<UserAddOutlined style={{ marginRight: token.marginXS }} />
				Tạo tài khoản
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
				>
					<Form.Item<SignupFieldType> name="name" label="Tên của bạn" rules={[{ required: true, message: "" }]}>
						<Input placeholder="Nguyễn Văn A" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType>
						name="email"
						label="Địa chỉ email của bạn."
						rules={[{ required: true, message: "" }]}
					>
						<Input placeholder="example@gmail.com" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType> name="password" label="Mật khẩu" rules={[{ required: true, message: "" }]}>
						<Input placeholder="Nhập mật khẩu ban đầu" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType>
						name="verifyPassword"
						label="Xác nhận mật khẩu"
						rules={[{ required: true, message: "" }]}
					>
						<Input placeholder="Xác nhận lại mật khẩu" autoFocus />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
			</Flex>
			<Typography.Text style={{ color: token.colorTextSecondary }}>
				Đã có tài khoản?&nbsp;
				<Link href={PagePath.signin}>Đăng nhập</Link>.
			</Typography.Text>
		</Flex>
	);
};

export default SignupForm;
