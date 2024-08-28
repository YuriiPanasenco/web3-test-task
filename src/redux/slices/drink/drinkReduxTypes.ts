import {Drink} from "../../../model/Drinks";

export const FETCH_DRINKS_REQUEST = "FETCH_DRINKS_REQUEST";
export const FETCH_DRINKS_SUCCESS = "FETCH_DRINKS_SUCCESS";
export const FETCH_DRINKS_FAILURE = "FETCH_DRINKS_FAILURE";

interface FetchDrinksRequestAction {
    type: typeof FETCH_DRINKS_REQUEST;
}

interface FetchDrinksSuccessAction {
    type: typeof FETCH_DRINKS_SUCCESS;
    payload: Drink[];
}

interface FetchDrinksFailureAction {
    type: typeof FETCH_DRINKS_FAILURE;
    payload: string;
}

export type DrinksActionTypes =
    | FetchDrinksRequestAction
    | FetchDrinksSuccessAction
    | FetchDrinksFailureAction;
