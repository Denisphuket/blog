import { StateSchema } from 'app/providers/StoreProvider';

export const SendCardToServerState = (state: StateSchema) => state.paymentGateway?.data || {};
