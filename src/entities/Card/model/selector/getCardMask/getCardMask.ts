import { StateSchema } from 'app/providers/StoreProvider';

export const getCardMask = (state: StateSchema) => state.card?.mask || '';
