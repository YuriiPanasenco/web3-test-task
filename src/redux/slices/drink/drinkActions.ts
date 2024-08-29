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
import {Category} from "../../../dto/Categories";
import InvalidAPIRequestException from "../../../api/InvalidAPIRequestException";
import {Exception} from "../../../dto/Exception";
import DrinksAPI from "../../../api/DrinksAPI";


export const fetchDrinks = (search: string, category: Category | null) => {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_DRINKS_REQUEST});

        try {
            const drinks = await DrinksAPI.getInstance().searchDrinks(search, category);
            dispatch({type: FETCH_DRINKS_SUCCESS, payload: drinks});
        } catch (error) {
            let payload = error;
            if (!(error instanceof InvalidAPIRequestException)) {
                payload = new Exception(error.message);
            }
            dispatch({type: FETCH_DRINKS_FAILURE, payload});
        }
    };
};

export const fetchRandomDrink = () => {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_RANDOM_DRINK_REQUEST});
        try {
            const drinks = await DrinksAPI.getInstance().fetchRandomDrink();
            dispatch({type: FETCH_RANDOM_DRINK_SUCCESS, payload: drinks[0]});
            return drinks[0];
        } catch (error) {
            dispatch({type: FETCH_RANDOM_DRINK_FAILURE, payload: new Exception(error.message)});
        }
    };
};