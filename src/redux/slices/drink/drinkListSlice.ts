import {DrinksActionTypes, FETCH_DRINKS_FAILURE, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS} from "./drinkReduxTypes";
import {DrinksState} from "../../../dto/Drinks";


const initialState: DrinksState = {
    loading: false,
    drinks: [],
    error: null,
};

const drinkListSlice = (state = initialState, action: DrinksActionTypes): DrinksState => {
    switch (action.type) {
    case FETCH_DRINKS_REQUEST:
        return {...state, loading: true, error: null};
    case FETCH_DRINKS_SUCCESS:
        return {...state, loading: false, drinks: action.payload, error: null};
    case FETCH_DRINKS_FAILURE:
        return {...state, loading: false, error: action.payload};
    default:
        return state;
    }
};

export default drinkListSlice;
