import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckPaymentSchema, ServerResponse } from '../types/checkPaymentSchema';
import { checkPaymentByNumber } from '../services/CheckPaymentByNumber';

const initialState: CheckPaymentSchema = {
    data: {},
    error: '',
    isLoading: true,
};

export const checkPaymentSlice = createSlice({
    name: 'checkPayment',
    initialState,
    reducers: {
        setCheckPayment: (state, action: PayloadAction<ServerResponse>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkPaymentByNumber.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkPaymentByNumber.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(checkPaymentByNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: checkPaymentActions } = checkPaymentSlice;
export const { reducer: checkPaymentReducer } = checkPaymentSlice;
