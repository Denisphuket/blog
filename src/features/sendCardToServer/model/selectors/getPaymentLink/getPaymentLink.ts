import { StateSchema } from 'app/providers/StoreProvider';

export const GetPaymentLink = (state: StateSchema) => state.paymentGateway?.data?.paymentUrl || '';
