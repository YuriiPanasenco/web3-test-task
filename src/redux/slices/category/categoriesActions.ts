import {Dispatch} from "redux";
import {CategoriesActionTypes, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from "./categoriesReduxTypes";
import {Category} from "../../../dto/Categories";
import API from "../../../api/API";

export function fetchCategories<T extends API>(api: T) {
    return async (dispatch: Dispatch<CategoriesActionTypes>) => {
        dispatch({type: FETCH_CATEGORIES_REQUEST});

        try {
            const data: Category[] = await api.fetchCategories();

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
}
