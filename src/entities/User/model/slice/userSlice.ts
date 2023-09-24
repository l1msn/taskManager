import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserScheme } from '../types/IUser';
import {
    USER_LOCALSTORAGE_KEY,
} from '@/shared/consts/localStorage';
import initAuthData from '../services/initAuthData';

const initialState: IUserScheme = {
    init: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;

            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                action.payload.id.toString(),
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initAuthData.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.authData = action.payload;
                state.init = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state.init = true;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
