import {configureStore, isPlain} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import {Exception} from "../dto/Exception";
import authSlice from './slices/auth/authSlice';
import drinkListSlice from "./slices/drink/drinkListSlice";
import categoriesSlice from "./slices/category/categoriesSlice";
import randomDrinkSlice from "./slices/drink/randomDrinkSlice";
import blockchainSlice from "./slices/blockchain/blockchainSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        drinkList: drinkListSlice,
        randomDrink: randomDrinkSlice,
        categories: categoriesSlice,
        blockchain: blockchainSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                isSerializable: (value) => {
                    if ((value instanceof Exception)) {
                        return true;
                    }
                    return isPlain(value);
                },
            },
        }).concat(thunk),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;