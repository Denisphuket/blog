export { checkPaymentByNumber } from './model/services/CheckPaymentByNumber';

export { checkPaymentReducer } from './model/slice/checkPaymentSlice';

export { getIsLoading } from './model/selectors/isLoading/getIsLoading';
export { getError } from './model/selectors/error/getError';

export {
    checkPaymentByNumberState,
} from './model/selectors/CheckPaymentByNumberState/CheckPaymentByNumberState';

export type { CheckPaymentSchema } from './model/types/checkPaymentSchema';
