import { StateSchema } from 'app/providers/StoreProvider';

export const getCardPan = (state: StateSchema) => state.card?.pan || '';
