import axios from "axios";
import {Dispatch} from "redux";
import {CategoriesActionTypes, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from "./categoriesReduxTypes";
import {Category} from "../../../model/Categories";

export const fetchCategories = () => {
    return async (dispatch: Dispatch<CategoriesActionTypes>) => {
        dispatch({type: FETCH_CATEGORIES_REQUEST});


        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
            const data: Category[] = response.data.drinks;

            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_CATEGORIES_FAILURE,
                payload: error.message,
            });
        }
    };
};
