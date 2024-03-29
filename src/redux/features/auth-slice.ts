import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from '../../utils/localstorage';

export type AuthState = {
    allUsers: any[];
    user: any;
    token?: string;
};

const initialState: AuthState = {
    allUsers: [],
    user: {},
    token: getLocalStorage('token'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        add_user: (state, { payload }) => {
            state.allUsers.push(payload);
            state.user = payload;
            setLocalStorage('user', state.user);
        },
        user_info: (state, { payload }) => {
            state.user = payload;
            setLocalStorage('user', state.user);
        },
        sign_out: state => {
            state.user = {};
            setLocalStorage('user', state.user);
        },
        get_user: state => {
            state.user = getLocalStorage('user');
        },

        signIn: (state, action: PayloadAction<string>) => {
            console.log('sign in');
            state.token = action.payload;
            setLocalStorage('token', action.payload);
        },
        signOut: (state, action: PayloadAction<void>) => {
            state.token = undefined;
            removeLocalStorage('token');
        },
    },
});

export const { user_info, add_user, sign_out, get_user, signIn, signOut } =
    authSlice.actions;

export default authSlice.reducer;
