"use client";

import React from "react";
import SigninForm, { FieldType } from "~/components/SigninForm";

const SigninPage = () => {
	const onSubmit = (data: FieldType) => {
		const { username, password } = data;
		console.log(data);
		// Todo TruongNBN: Add login logic here later
	};

	return <SigninForm onSubmit={onSubmit} />;
};

export default SigninPage;
