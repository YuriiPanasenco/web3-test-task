import axios from "axios";
import {Dispatch} from "redux";
import {DrinksActionTypes, FETCH_DRINKS_FAILURE, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS} from "./drinkReduxTypes";
import {Drink} from "../../../model/Drinks";


export const fetchDrinks = (search: string) => {
    return async (dispatch: Dispatch<DrinksActionTypes>) => {
        dispatch({type: FETCH_DRINKS_REQUEST});

        const params = [];
        if (search && search.length > 0) {
            params.push(`s=${search}`);
        } else {
            params.push(`f=a`);
        }


        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${params.join('&')}`);
            const data: Drink[] = response.data.drinks;

            dispatch({
                type: FETCH_DRINKS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_DRINKS_FAILURE,
                payload: error.message,
            });
        }
    };
};
