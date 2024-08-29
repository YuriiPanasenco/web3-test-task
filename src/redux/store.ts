import {configureStore, isPlain} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import authSlice from './slices/authSlice';
import drinksSlice from "./slices/drink/drinksSlice";
import categoriesSlice from "./slices/category/categoriesSlice";
import {Exception} from "../model/Exception";


const store = configureStore({
    reducer: {
        auth: authSlice,
        drinks: drinksSlice,
        categories: categoriesSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                isSerializable: (value) => {
                    if (value instanceof Exception) {
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