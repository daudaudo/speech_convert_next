"use client";

import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import authActions from "~/actions/auth";
import { useAuth } from "~/contexts/authContext";
import { useTheme } from "~/contexts/themeContext";
import { PagePath } from "~/enums/path";
import { FetchStatusType } from "~/types";

type SignupFieldType = {
	username: string;
	email: string;
	password: string;
	verifyPassword: string;
};

const SignupForm = () => {
	const { token } = useTheme();
	const [form] = Form.useForm();
	const { signin } = useAuth();

	const [{ loading, error }, setSignupState] = useState<FetchStatusType>({ loading: false, error: "" });

	const onSignup = useCallback(
		async (username: string, email: string, password: string) => {
			setSignupState((prev) => ({ ...prev, loading: true }));
			const signupRes = await authActions.onSignup(username, email, password);
			if (signupRes.success) {
				const signinRes = await authActions.onSignin(email, password);
				if (signinRes.success) {
					const access_token = signinRes?.data?.access_token;
					signin(access_token);
					setSignupState({ loading: false, error: "" });
				} else setSignupState({ loading: false, error: "Đăng kí thành công. Lỗi trong quá trình đăng nhập" });
			} else setSignupState({ loading: false, error: "Email hoặc tên người dùng đã tồn tại." });
		},
		[signin],
	);

	const onFinish = useCallback(
		async (values: SignupFieldType) => {
			const { username, email, password } = values;
			await onSignup(username, email, password);
		},
		[onSignup],
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
			{error && (
				<Flex
					style={{
						flexDirection: "column",
						borderRadius: token.borderRadius,
						borderWidth: 1,
						borderColor: token.colorWarningBorder,
						backgroundColor: token.colorWarningBg,
						padding: token.paddingSM,
					}}
				>
					<Typography.Text style={{ fontWeight: 600, color: token.colorWarningText }}>
						Đăng kí không thành công
					</Typography.Text>
					<Typography.Text style={{ color: token.colorWarningText }}>{error}</Typography.Text>
				</Flex>
			)}
			<Flex justify="center" style={{ marginTop: token.marginSM, width: "100%" }}>
				<Form
					form={form}
					name="signup"
					onFinish={onFinish}
					layout="vertical"
					labelCol={{ span: 24, style: { fontWeight: 600, color: token.colorTextSecondary } }}
					style={{ width: "100%" }}
					colon={false}
					validateTrigger={["onSubmit"]}
				>
					<Form.Item<SignupFieldType>
						name="username"
						label="Tên của bạn"
						rules={[
							{ required: true, message: "Bạn phải nhập một giá trị." },
							{ min: 6, message: "Tên phải có ít nhất 6 ký tự." },
						]}
					>
						<Input placeholder="Nguyễn Văn A" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType>
						name="email"
						label="Địa chỉ email của bạn."
						rules={[
							{ required: true, message: "Bạn phải nhập một giá trị." },
							{ type: "email", message: "Email không hợp lệ." },
						]}
					>
						<Input placeholder="example@gmail.com" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType>
						name="password"
						label="Mật khẩu"
						rules={[
							{ required: true, message: "Bạn phải nhập một giá trị." },
							{ min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
							{ max: 20, message: "Mật khẩu phải có tối đa 20 ký tự." },
						]}
					>
						<Input.Password placeholder="Nhập mật khẩu ban đầu" autoFocus />
					</Form.Item>
					<Form.Item<SignupFieldType>
						name="verifyPassword"
						label="Xác nhận mật khẩu"
						rules={[
							{ required: true, message: "Bạn phải nhập một giá trị." },
							{
								validator: (_, value) => {
									if (value !== form.getFieldValue("password")) {
										return Promise.reject("Xác nhận mật khẩu không khớp.");
									}
									return Promise.resolve();
								},
							},
						]}
					>
						<Input.Password placeholder="Xác nhận lại mật khẩu" autoFocus />
					</Form.Item>
					<Form.Item>
						<Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
							<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
								Đăng nhập
							</Button>
						</Spin>
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
