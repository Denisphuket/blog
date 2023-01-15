import type {
    StateSchema, ReduxStoreWithManager, StateSchemaKey, ThunkConfig,
} from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
    createReduxStore,
    StoreProvider,
    StateSchema,
    StateSchemaKey,
    ReduxStoreWithManager,
    AppDispatch,
    ThunkConfig,
};
