import {DrinksActionTypes, FETCH_DRINKS_FAILURE, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS} from "./drinkReduxTypes";
import {Drink, DrinksState} from "../../../dto/Drinks";
import {ADD_FAVOURITES_REQUEST, FavouritesActionTypes, REMOVE_FAVOURITES_REQUEST} from "./favouritesReduxTypes";
import {deepCopy} from "../../../tools";


const initialState: DrinksState = {
    loading: false,
    drinks: [],
    error: null,
};

const drinkListSlice = (state = initialState, action: DrinksActionTypes | FavouritesActionTypes): DrinksState => {
    switch (action.type) {
    case FETCH_DRINKS_REQUEST:
        return {...state, loading: true, error: null};
    case FETCH_DRINKS_SUCCESS:
        return {...state, loading: false, drinks: action.payload, error: null};
    case FETCH_DRINKS_FAILURE:
        return {...state, loading: false, error: action.payload};
    case ADD_FAVOURITES_REQUEST:
    case REMOVE_FAVOURITES_REQUEST:
        return {...state, drinks: changeIsFavourite(state.drinks, action.payload as Drink)};
    default:
        return state;
    }
};

export default drinkListSlice;


function changeIsFavourite(drinks: Drink[], drink: Drink) {
    const newList = drinks.slice(0, drinks.length);
    const index = newList.findIndex(d => drink.idDrink == d.idDrink);
    newList[index] = deepCopy(drink);
    newList[index].isFavourite = !newList[index].isFavourite;
    return newList;
}
