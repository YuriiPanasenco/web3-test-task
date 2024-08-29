import {CategoriesActionTypes, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from "./categoriesReduxTypes";
import {CategoriesState} from "../../../dto/Categories";


const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};

const categoriesSlice = (
    state = initialState,
    action: CategoriesActionTypes
): CategoriesState => {
    switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
        return {...state, loading: true, error: null};
    case FETCH_CATEGORIES_SUCCESS:
        return {...state, loading: false, categories: action.payload, error: null};
    case FETCH_CATEGORIES_FAILURE:
        return {...state, loading: false, error: action.payload};
    default:
        return state;
    }
};

export default categoriesSlice;
