import {
    FavouritesActionTypes,
    ADD_FAVOURITES_REQUEST,
    FETCH_FAVOURITES_FAILURE,
    FETCH_FAVOURITES_REQUEST,
    FETCH_FAVOURITES_SUCCESS,
    REMOVE_FAVOURITES_REQUEST
} from "./favouritesReduxTypes";
import {DrinksState} from "../../../model/Drinks";
import {getUniqueValues} from "../../../tools";


const initialState: DrinksState = {
    loading: false,
    drinks: [],
    error: null,
};

const favouritesSlice = (
    state = initialState,
    action: FavouritesActionTypes
): DrinksState => {
    switch (action.type) {
    case FETCH_FAVOURITES_REQUEST:
        return {...state, loading: true, error: null};
    case FETCH_FAVOURITES_SUCCESS:
        return {...state, loading: false, drinks: action.payload, error: null};
    case FETCH_FAVOURITES_FAILURE:
        return {...state, loading: false, error: action.payload};
    case ADD_FAVOURITES_REQUEST:
        return {...state, drinks: getUniqueValues([...state.drinks, action.payload])};
    case REMOVE_FAVOURITES_REQUEST:
        return {...state, drinks: [...state.drinks.filter(d => d !== action.payload)]};
    default:
        return state;
    }
};

export default favouritesSlice;
