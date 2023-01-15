import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { sendCardToServerActions } from '../slice/sendCardToServerSlice';
import { ServerResponse } from '../types/sendCardToServerSchema';

interface SendEncryptCardToServerProps {
	order: string;
	encryptCard: string;
}

export const SendEncryptCardToServer = createAsyncThunk<ServerResponse, SendEncryptCardToServerProps, ThunkConfig<string>>(
    'sendCard/sendToServer',
    async (data, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await extra.api.post(extra.helper.SEND_CARD, data);
            if (!response.data) {
                throw new Error();
            }
            dispatch(sendCardToServerActions.setPaymentUrl(response.data));
            return response.data;
        } catch (error) {
            if (error.response?.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Произошла ошибка');
        }
    },
);
