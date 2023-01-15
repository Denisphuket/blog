import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { checkPaymentActions } from '../slice/checkPaymentSlice';
import { ServerResponse } from '../types/checkPaymentSchema';

interface CheckPaymentByNumberProps {
	number: string;
}

export const checkPaymentByNumber = createAsyncThunk<ServerResponse, CheckPaymentByNumberProps, ThunkConfig<string>>(
    'checkPayment/checkPaymentByNumber',
    async (data, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await extra.api.post(extra.helper.CHECK_PAYMENT, data);
            if (!response.data) {
                throw new Error();
            }

            dispatch(checkPaymentActions.setCheckPayment(response.data));

            return response.data;
        } catch (error) {
            if (error.response?.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Произошла ошибка');
        }
    },
);
