import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SendEncryptCardToServer } from '../services/SendEncryptCardToServer';
import { SendCardToServerSchema, ServerResponse } from '../types/sendCardToServerSchema';

const initialState: SendCardToServerSchema = {
    data: {},
    error: '',
    isLoading: false,
};

export const sendCardToServerSlice = createSlice({
    name: 'sendCardToServer',
    initialState,
    reducers: {
        setPaymentUrl: (state, action: PayloadAction<ServerResponse>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SendEncryptCardToServer.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(SendEncryptCardToServer.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(SendEncryptCardToServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: sendCardToServerActions } = sendCardToServerSlice;
export const { reducer: sendCardToServerReducer } = sendCardToServerSlice;
