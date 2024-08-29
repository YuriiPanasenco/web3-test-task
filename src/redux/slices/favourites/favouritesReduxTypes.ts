import {Drink} from "../../../model/Drinks";

export const FETCH_FAVOURITES_REQUEST = "FETCH_FAVOURITES_REQUEST";
export const FETCH_FAVOURITES_SUCCESS = "FETCH_FAVOURITES_SUCCESS";
export const FETCH_FAVOURITES_FAILURE = "FETCH_FAVOURITES_FAILURE";

export const ADD_FAVOURITES_REQUEST = "ADD_FAVOURITES_REQUEST";
export const REMOVE_FAVOURITES_REQUEST = "REMOVE_FAVOURITES_REQUEST";


interface FetchFavouritesRequestAction {
    type: typeof FETCH_FAVOURITES_REQUEST;
}

interface FetchFavouritesSuccessAction {
    type: typeof FETCH_FAVOURITES_SUCCESS;
    payload: Drink[];
}

interface FetchFavouritesFailureAction {
    type: typeof FETCH_FAVOURITES_FAILURE;
    payload: string;
}

interface AddFavouritesRequestAction {
    type: typeof ADD_FAVOURITES_REQUEST;
    payload: Drink;
}

interface RemoveFavouritesRequestAction {
    type: typeof REMOVE_FAVOURITES_REQUEST;
    payload: Drink;
}

export type FavouritesActionTypes =
    | FetchFavouritesRequestAction
    | FetchFavouritesSuccessAction
    | FetchFavouritesFailureAction
    | AddFavouritesRequestAction
    | RemoveFavouritesRequestAction
    ;
