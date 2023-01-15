export interface ServerResponse {
	paymentUrl?: string
}

export interface SendCardToServerSchema {
	data: ServerResponse;
	isLoading: boolean;
	error?: string;
}
