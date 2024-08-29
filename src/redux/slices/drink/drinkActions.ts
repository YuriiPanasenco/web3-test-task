import axios from "axios";
import {Dispatch} from "redux";
import {DrinksActionTypes, FETCH_DRINKS_FAILURE, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS} from "./drinkReduxTypes";
import {Drink} from "../../../model/Drinks";
import {Category} from "../../../model/Categories";
import InvalidAPIRequestException from "../InvalidAPIRequestException";
import {Exception} from "../../../model/Exception";


export const fetchDrinks = (search: string, category: Category | null) => {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_DRINKS_REQUEST});

        const params = [];
        if (search && search.length > 0) {
            params.push(`search.php?s=${search}`);
            if (category) {
                dispatch({type: FETCH_DRINKS_FAILURE, payload: new InvalidAPIRequestException("The API doesn't allow filtering by multiple props")});
                return;
            }
        } else if (category) {
            params.push(`filter.php?c=${category.strCategory}`);
        } else {
            params.push(`search.php?f=a`);
        }

        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${params.join('&')}`);
            const data: Drink[] = response.data.drinks;

            dispatch({
                type: FETCH_DRINKS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_DRINKS_FAILURE,
                payload: new Exception(error.message),
            });
        }
    };
};
