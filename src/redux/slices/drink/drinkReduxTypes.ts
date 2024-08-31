import {Drink} from "../../../dto/Drinks";

export const FETCH_DRINKS_REQUEST = "FETCH_DRINKS_REQUEST";
export const FETCH_DRINKS_SUCCESS = "FETCH_DRINKS_SUCCESS";
export const FETCH_DRINKS_FAILURE = "FETCH_DRINKS_FAILURE";

export const FETCH_RANDOM_DRINK_REQUEST = "FETCH_RANDOM_DRINK_REQUEST";
export const FETCH_RANDOM_DRINK_SUCCESS = "FETCH_RANDOM_DRINK_SUCCESS";
export const FETCH_RANDOM_DRINK_FAILURE = "FETCH_RANDOM_DRINK_FAILURE";

export const CHANGE_RANK_SUCCESS = "CHANGE_RANK_SUCCESS";

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

interface FetchRandomDrinkRequestAction {
    type: typeof FETCH_RANDOM_DRINK_REQUEST;
}

interface FetchRandomDrinkSuccessAction {
    type: typeof FETCH_RANDOM_DRINK_SUCCESS;
    payload: Drink;
}

interface FetchRandomDrinkFailureAction {
    type: typeof FETCH_RANDOM_DRINK_FAILURE;
    payload: string;
}

interface ChangeRankSuccessAction {
    type: typeof CHANGE_RANK_SUCCESS;
    payload: { drink: Drink, rank: number };
}

export type DrinksActionTypes =
    | FetchDrinksRequestAction
    | FetchDrinksSuccessAction
    | FetchDrinksFailureAction
    | FetchRandomDrinkRequestAction
    | FetchRandomDrinkSuccessAction
    | FetchRandomDrinkFailureAction
    | ChangeRankSuccessAction
    ;
