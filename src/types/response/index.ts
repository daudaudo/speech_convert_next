export type ResponseData<Data = any> = {
	status: number;
	data: Data;
	success: boolean;
	message?: string | null;
};
