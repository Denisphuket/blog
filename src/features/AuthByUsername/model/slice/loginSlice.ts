import { createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
    username: '',
    password: '',
    error: '',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: '',
    initialState,
    reducers: {},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
