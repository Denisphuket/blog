import { StateSchema } from 'app/providers/StoreProvider';

export const getCardYear = (state: StateSchema) => state.card?.year || 0;
