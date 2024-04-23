"use client";

import React, { useCallback, useState } from "react";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTheme } from "~/contexts/themeContext";
import authActions from "~/actions/auth";
import { PagePath } from "~/enums/path";
import { useAuth } from "~/contexts/authContext";
import { FetchStatusType } from "~/types";

type SigninFieldType = {
	email: string;
	password: string;
};

const SigninForm = () => {
	const { token } = useTheme();
	const [form] = Form.useForm();
	const { signin } = useAuth();

	const [{ loading, error }, setSigninState] = useState<FetchStatusType>({ loading: false, error: "" });

	const onSignin = useCallback(
		async (email: string, password: string) => {
			setSigninState((prev) => ({ ...prev, loading: true }));
			const signinRes = await authActions.onSignin(email, password);
			if (signinRes.success) {
				const access_token = signinRes?.data?.access_token;
				signin(access_token);
			} else setSigninState({ loading: false, error: signinRes.message });
		},
		[signin],
	);

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
			}}
		>
			<Typography.Title level={3} style={{ color: token.blue, textAlign: "center" }}>
				<LoginOutlined style={{ marginRight: token.marginXS }} />
				Đăng nhập
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
						Đăng nhập không thành công
					</Typography.Text>
					<Typography.Text style={{ color: token.colorWarningText }}>
						Vui lòng kiểm tra thông tin đăng nhập của bạn và thử lại.
					</Typography.Text>
				</Flex>
			)}
			<Flex justify="center" style={{ marginTop: token.marginSM, width: "100%" }}>
				<Form
					form={form}
					name="signin"
					onFinish={onFinish}
					layout="vertical"
					labelCol={{ span: 24, style: { fontWeight: 600, color: token.colorTextSecondary } }}
					style={{ width: "100%" }}
					colon={false}
					validateTrigger={["onSubmit"]}
				>
					<Form.Item<SigninFieldType>
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "Bạn phải nhập một giá trị." },
							{ type: "email", message: "Email không hợp lệ." },
						]}
					>
						<Input placeholder="Nhập email của bạn" autoFocus />
					</Form.Item>
					<Form.Item<SigninFieldType>
						name="password"
						label="Mật khẩu"
						rules={[{ required: true, message: "Bạn phải nhập một giá trị." }]}
					>
						<Input.Password placeholder="Nhập mật khẩu của bạn" />
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
