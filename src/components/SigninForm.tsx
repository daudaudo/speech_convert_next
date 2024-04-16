"use client";

import React from "react";
import { Button, Form, Input, theme } from "antd";

export type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

interface SigninFormProps {
	onFinish: (data: FieldType) => void;
}

const SigninForm = (props: SigninFormProps) => {
	const { onFinish } = props;

	const { token } = theme.useToken();
	const [form] = Form.useForm();

	return (
		<Form
			form={form}
			name="signin"
			initialValues={{ remember: true }}
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
	);
};

export default SigninForm;
