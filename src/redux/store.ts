import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import authSlice from './slices/authSlice';
import drinksSlice from "./slices/drink/drinksSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        drinks: drinksSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;