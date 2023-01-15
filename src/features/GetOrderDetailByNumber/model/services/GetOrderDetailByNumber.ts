import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getOrderActions } from '../slice/getOrderSlice';
import { ServerResponse } from '../types/getOrderSchema';

interface GetOrderDetailByNumberProps {
	uuid: string;
}

export const orderDetailByNumber = createAsyncThunk<ServerResponse,
    GetOrderDetailByNumberProps, ThunkConfig<string>>(
        'orderDetail/orderDetailByNumber',
        async (data, thunkAPI) => {
            const { extra, rejectWithValue, dispatch } = thunkAPI;
            try {
                const response = await extra.api.post(extra.helper.GET_ORDER_BY_NUMBER, data);
                if (!response.data) {
                    throw new Error();
                }

                dispatch(getOrderActions.setOrder(response.data));

                return response.data;
            } catch (error) {
                if (error.response?.data) {
                    return rejectWithValue(error.response.data.message);
                }
                return rejectWithValue('Произошла ошибка');
            }
        },
    );
