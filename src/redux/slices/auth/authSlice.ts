import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Exception} from "../../../dto/Exception";
import {connectAction} from "./authActions";

type AuthState = {
    status: 'disconnected' | 'loading' | 'idle';
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
        login(state: AuthState, action: PayloadAction<object>) {
            state.account = action.payload;
            state.error = null;
            state.status = 'idle';
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
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addCase(connectAction.pending, (state: AuthState) => {
                state.status = 'loading';
            })
            .addCase(connectAction.fulfilled, (state: AuthState, action: PayloadAction<object>) => {
                state.status = 'idle';
                state.account = action.payload;
            })
            .addCase(connectAction.rejected, (state: AuthState) => {
                state.status = 'disconnected';
                state.error = new Exception("Can not connect for some reason");
            });
    },
})
;


export const {login, logout, loading} = authSlice.actions;
export default authSlice.reducer;
