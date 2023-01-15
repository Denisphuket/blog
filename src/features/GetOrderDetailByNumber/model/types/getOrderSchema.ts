interface ProductDetail {
	name: string;
	quantity: number;
	price: string;
	sum: string;
	tax: string;
}

export interface ServerResponse {
	items?: ProductDetail[],
	taxation?: string;
	sum?: string;
	order?: string;
}

export interface GetOrderSchema {
	data: ServerResponse;
	isLoading: boolean;
	error?: string;
}
