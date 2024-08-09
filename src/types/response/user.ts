export type UserResponseData = {
	_id: string;
	username: string;
	email: string;
	balance: number;
	created_at: string;
	updated_at: string;
};

export type BalanceResponseData = {
	used_balance: number;
	balance: number;
};
