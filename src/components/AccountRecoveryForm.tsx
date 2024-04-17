"use client";

import { ArrowLeftOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";
import { useTheme } from "~/contexts/themeContext";
import { PagePath } from "~/enums/path";

type AccountRecoveryType = {
	email: string;
};

const AccountRecoveryForm = () => {
	const { token } = useTheme();
	const [form] = Form.useForm();

	const onFinish = useCallback(async (values: AccountRecoveryType) => {
		const { email } = values;
		//
	}, []);

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
			<Typography.Title level={3} style={{ color: token.blue }}>
				Quên mật khẩu?
			</Typography.Title>
			<Typography.Text style={{ color: token.colorTextSecondary }}>
				Đừng lo, chỉ cần nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một mã bí mật để đặt lại mật khẩu của
				bạn!
			</Typography.Text>
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
					<Form.Item<AccountRecoveryType>
						name="email"
						label="Địa chỉ email của bạn."
						rules={[{ required: true, message: "" }]}
					>
						<Input placeholder="example@gmail.com" autoFocus />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
							Gửi cho tôi một mã bí mật
						</Button>
					</Form.Item>
				</Form>
			</Flex>
			<Link href={PagePath.signin}>
				<Button type="link" icon={<ArrowLeftOutlined />} style={{ padding: 0 }}>
					Trở về đăng nhập
				</Button>
			</Link>
		</Flex>
	);
};

export default AccountRecoveryForm;
