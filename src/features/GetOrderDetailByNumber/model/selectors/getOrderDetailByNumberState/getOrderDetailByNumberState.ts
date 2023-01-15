import { StateSchema } from 'app/providers/StoreProvider';

export const getOrderDetailByNumberState = (state: StateSchema) => state.order?.data || {};
