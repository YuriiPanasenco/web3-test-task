import {createSlice} from '@reduxjs/toolkit';

import {Exception} from "../../../dto/Exception";


type AuthState = {
    status: 'disconnected' | 'loading' | 'connected';
    error: Exception | null;
    account: object | null
}

const initialState: AuthState = {
    status: 'disconnected',
    error: null,
    account: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state: AuthState) {
            // state.account = action.payload;
            state.error = null;
            state.status = 'connected';
        },
        logout(state: AuthState) {
            state.account = null;
            state.error = null;
            state.status = 'disconnected';
        },
        loading(state: AuthState) {
            state.account = null;
            state.error = null;
            state.status = 'loading';
        }
    }
});


export const {login, logout, loading} = authSlice.actions;
export default authSlice.reducer;
