import {DrinksActionTypes, FETCH_RANDOM_DRINK_FAILURE, FETCH_RANDOM_DRINK_REQUEST, FETCH_RANDOM_DRINK_SUCCESS} from "./drinkReduxTypes";
import {RandomDrinkState} from "../../../dto/Drinks";


const initialState: RandomDrinkState = {
    loading: false,
    drink: null,
    error: null,
};

const randomDrinkSlice = (state = initialState, action: DrinksActionTypes): RandomDrinkState => {
    switch (action.type) {
    case FETCH_RANDOM_DRINK_REQUEST:
        return {...state, loading: true, error: null};
    case FETCH_RANDOM_DRINK_SUCCESS:
        return {...state, loading: false, drink: action.payload, error: null};
    case FETCH_RANDOM_DRINK_FAILURE:
        return {...state, loading: false, error: action.payload};
    default:
        return state;
    }
};

export default randomDrinkSlice;
