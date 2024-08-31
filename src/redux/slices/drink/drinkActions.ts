import {Dispatch} from "redux";
import {
    DrinksActionTypes,
    FETCH_DRINKS_FAILURE,
    FETCH_DRINKS_REQUEST,
    FETCH_DRINKS_SUCCESS,
    FETCH_RANDOM_DRINK_FAILURE,
    FETCH_RANDOM_DRINK_REQUEST,
    FETCH_RANDOM_DRINK_SUCCESS
} from "./drinkReduxTypes";
import {FavouritesActionTypes, ADD_FAVOURITES_REQUEST, REMOVE_FAVOURITES_REQUEST} from "./favouritesReduxTypes";
import {Category} from "../../../dto/Categories";
import InvalidAPIRequestException from "../../../api/InvalidAPIRequestException";
import {Exception} from "../../../dto/Exception";
import API, {AnyAPIInstanceType} from "../../../api/API";
import {Drink} from "../../../dto/Drinks";


export function fetchAllDrinks<T extends API>(api: AnyAPIInstanceType<T>, search: string, category: Category | null) {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_DRINKS_REQUEST});

        try {
            const drinks = await api.getInstance().searchDrinks(search, category);
            dispatch({type: FETCH_DRINKS_SUCCESS, payload: drinks});
        } catch (error) {
            let payload = error;
            if (!(error instanceof InvalidAPIRequestException)) {
                payload = new Exception(error.message);
            }
            dispatch({type: FETCH_DRINKS_FAILURE, payload});
        }
    };
}

export function fetchRandomDrink<T extends API>(api: AnyAPIInstanceType<T>) {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_RANDOM_DRINK_REQUEST});
        try {
            const drinks = await api.getInstance().fetchRandomDrink();
            dispatch({type: FETCH_RANDOM_DRINK_SUCCESS, payload: drinks[0]});
            return drinks[0];
        } catch (error) {
            dispatch({type: FETCH_RANDOM_DRINK_FAILURE, payload: new Exception(error.message)});
            throw error;
        }
    };
}

export function addFavourite<T extends API>(api: AnyAPIInstanceType<T>, drink: Drink) {
    return async (dispatch: Dispatch<FavouritesActionTypes>) => {
        await api.getInstance().addFavourite(drink);
        dispatch({type: ADD_FAVOURITES_REQUEST, payload: drink});
    };
}

export function removeFavourite<T extends API>(api: AnyAPIInstanceType<T>, drink: Drink) {
    return async (dispatch: Dispatch<FavouritesActionTypes>) => {
        await api.getInstance().removeFavourite(drink);
        dispatch({type: REMOVE_FAVOURITES_REQUEST, payload: drink});
    };
}