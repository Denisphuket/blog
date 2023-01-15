export interface ServerResponse {
	transferType?: string;
	paymentStatus?: string;
	ozonStatusMessage?: string;
	cardMask?: string;
	amount?: number;
	nameOfBank?: string;
	successUrl?: string;
	failUrl?: string;
}

export interface CheckPaymentSchema {
	data: ServerResponse;
	isLoading: boolean;
	error?: string;
}
