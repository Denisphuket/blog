import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
// import { UserTokens } from 'entities/User/model/types/user';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<'UserTokens', LoginByUsernameProps, ThunkConfig<string>>(
    'login/fetchByIdStatus',
    async (authData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await extra.api.post<'UserTokens'>(extra.helper.LOGIN, authData);
            if (!response.data) {
                throw new Error();
            }

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            // dispatch(userActions.setAuthData(response.data));
            extra.navigate('/');

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);
