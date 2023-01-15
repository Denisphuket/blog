export interface CardSchema {
	pan: string;
	mask: string;
	month: number;
	year: number;
	cvc: string;
	isError?: boolean;
}
