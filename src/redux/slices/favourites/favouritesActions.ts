import {Dispatch} from "redux";
import {
    ADD_FAVOURITES_REQUEST,
    FavouritesActionTypes,
    FETCH_FAVOURITES_FAILURE,
    FETCH_FAVOURITES_REQUEST,
    FETCH_FAVOURITES_SUCCESS,
    REMOVE_FAVOURITES_REQUEST
} from "./favouritesReduxTypes";
import {Drink} from "../../../model/Drinks";
import {Category} from "../../../model/Categories";
import {Exception} from "../../../model/Exception";
import FavouritesAPI from "../../../api/FavouritesAPI";


export const addFavourite = (drink: Drink) => {
    return async (dispatch: Dispatch<FavouritesActionTypes>) => {
        await FavouritesAPI.getInstance().add(drink);
        dispatch({type: ADD_FAVOURITES_REQUEST, payload: drink});
    };
}

export const removeFavourite = (drink: Drink) => {
    return async (dispatch: Dispatch<FavouritesActionTypes>) => {
        await FavouritesAPI.getInstance().remove(drink);
        dispatch({type: REMOVE_FAVOURITES_REQUEST, payload: drink});
    };
}
export const fetchFavourites = (search: string, category: Category | null) => {
    return async (dispatch: Dispatch<FavouritesActionTypes>) => {
        dispatch({type: FETCH_FAVOURITES_REQUEST});

        try {
            const drinks = await FavouritesAPI.getInstance().searchDrinks(search, category);
            dispatch({type: FETCH_FAVOURITES_SUCCESS, payload: drinks});
        } catch (error) {
            dispatch({type: FETCH_FAVOURITES_FAILURE, payload: new Exception(error.message)});
        }

    };
};
