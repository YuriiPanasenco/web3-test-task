import {Drink} from "../../../dto/Drinks";


export const ADD_FAVOURITES_REQUEST = "ADD_FAVOURITES_REQUEST";
export const REMOVE_FAVOURITES_REQUEST = "REMOVE_FAVOURITES_REQUEST";


interface AddFavouritesRequestAction {
    type: typeof ADD_FAVOURITES_REQUEST;
    payload: Drink;
}

interface RemoveFavouritesRequestAction {
    type: typeof REMOVE_FAVOURITES_REQUEST;
    payload: Drink;
}

export type FavouritesActionTypes =
    | AddFavouritesRequestAction
    | RemoveFavouritesRequestAction
    ;
