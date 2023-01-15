import { StateSchema } from 'app/providers/StoreProvider';

export const getCardIsError = (state: StateSchema) => state.card?.isError || false;
