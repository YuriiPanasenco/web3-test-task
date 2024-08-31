import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetAccountReturnType} from "@wagmi/core";
// import {config} from "../../../wagmi.config";

export const connectAction = createAsyncThunk(
    'auth/connect',
    async (account: GetAccountReturnType) => {
        try {

            // const bal = await getBalance(config, {
            //     address: account.address,
            // })
            // console.log(bal, account);
            return account;
        } catch (error) {
            return error.message;
        }
    }
);
