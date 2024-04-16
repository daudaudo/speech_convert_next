"use client";

import React, { useCallback } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTheme } from "~/contexts/themeContext";

export type FieldType = {
	username?: string;
	password?: string;
};

interface SigninFormProps {
	onSubmit: (data: FieldType) => void;
}

const SigninForm = (props: SigninFormProps) => {
	const { onSubmit } = props;

	const { token } = useTheme();
	const [form] = Form.useForm();

	const onFinish = useCallback(
		(values: FieldType) => {
			onSubmit(values);
		},
		[onSubmit],
	);

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
				<Form
					form={form}
					name="signin"
					onFinish={onFinish}
					layout="vertical"
					labelCol={{ span: 24, style: { fontWeight: 600, color: token.colorTextSecondary } }}
					style={{ width: "100%" }}
					colon={false}
				>
					<Form.Item<FieldType> name="username" label="Tài khoản" rules={[{ required: true, message: "" }]}>
						<Input placeholder="Nhập tài khoản của bạn" autoFocus />
					</Form.Item>
					<Form.Item<FieldType> name="password" label="Mật khẩu" rules={[{ required: true, message: "" }]}>
						<Input.Password placeholder="Nhập mật khẩu của bạn" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
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

export default SigninForm;
