import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { To } from '@remix-run/router';
import { NavigateOptions } from 'react-router/dist/lib/context';
import { Helper } from 'shared/lib/api/helper';
import { GetOrderSchema } from 'features/GetOrderDetailByNumber';
import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';
import { CardSchema } from 'entities/Card';
import { SendCardToServerSchema } from 'features/sendCardToServer';
import { CheckPaymentSchema } from 'features/CheckPayment';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	card: CardSchema;

	// Асинк редюсеры
	loginForm?: LoginSchema;
	order?: GetOrderSchema;
	paymentGateway?: SendCardToServerSchema;
	checkPayment?: CheckPaymentSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}

export interface ThunkExtraArg {
	api: AxiosInstance,
	helper: typeof Helper,
	navigate: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg
}
