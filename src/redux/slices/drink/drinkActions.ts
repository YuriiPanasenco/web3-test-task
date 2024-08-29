import {Dispatch} from "redux";
import {DrinksActionTypes, FETCH_DRINKS_FAILURE, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS} from "./drinkReduxTypes";
import {Category} from "../../../model/Categories";
import InvalidAPIRequestException from "../../../api/InvalidAPIRequestException";
import {Exception} from "../../../model/Exception";
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
