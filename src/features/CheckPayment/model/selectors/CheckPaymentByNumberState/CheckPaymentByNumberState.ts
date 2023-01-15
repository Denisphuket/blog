import { StateSchema } from 'app/providers/StoreProvider';

export const checkPaymentByNumberState = (state: StateSchema) => state.checkPayment?.data || {};
