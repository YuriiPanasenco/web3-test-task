import {Category} from "../../../dto/Categories";

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

interface FetchCategoriesRequestAction {
    type: typeof FETCH_CATEGORIES_REQUEST;
}

interface FetchCategoriesSuccessAction {
    type: typeof FETCH_CATEGORIES_SUCCESS;
    payload: Category[];
}

interface FetchCategoriesFailureAction {
    type: typeof FETCH_CATEGORIES_FAILURE;
    payload: string;
}

export type CategoriesActionTypes =
    | FetchCategoriesRequestAction
    | FetchCategoriesSuccessAction
    | FetchCategoriesFailureAction;
