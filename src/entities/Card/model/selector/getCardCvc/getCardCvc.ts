import { StateSchema } from 'app/providers/StoreProvider';

export const getCardCvc = (state: StateSchema) => state.card?.cvc || '';
