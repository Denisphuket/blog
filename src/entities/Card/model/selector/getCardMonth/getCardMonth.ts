import { StateSchema } from 'app/providers/StoreProvider';

export const getCardMonth = (state: StateSchema) => state.card?.month || 0;
