import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetOrderSchema, ServerResponse } from '../types/getOrderSchema';
import { orderDetailByNumber } from '../services/GetOrderDetailByNumber';

const initialState: GetOrderSchema = {
    data: {},
    error: '',
    isLoading: false,
};

export const getOrderSlice = createSlice({
    name: 'getOrder',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<ServerResponse>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderDetailByNumber.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(orderDetailByNumber.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(orderDetailByNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: getOrderActions } = getOrderSlice;
export const { reducer: getOrderReducer } = getOrderSlice;
