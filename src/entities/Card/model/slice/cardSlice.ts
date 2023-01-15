import { createSlice } from '@reduxjs/toolkit';
import { CardSchema } from 'entities/Card/model/types/CardSchema';

const initialState: CardSchema = {
    cvc: '',
    mask: '',
    pan: '',
    month: 0,
    year: 0,
    isError: false,
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setPan: (state, action) => {
            state.pan = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setCvc: (state, action) => {
            state.cvc = action.payload;
        },
        setMask: (state, action) => {
            state.mask = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
    },
});

export const { actions: cardActions } = cardSlice;
export const { reducer: cardReducer } = cardSlice;
