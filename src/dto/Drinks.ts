export interface Drink {
    idDrink: string;
    strDrink: string;
    strInstructions: string;
    strDrinkThumb: string;
    strCategory: string;
    // Add other fields as needed
}

export interface DrinksState {
    drinks: Array<Drink>;
    loading: boolean;
    error: string | null;
}

export interface RandomDrinkState {
    drink: Drink;
    loading: boolean;
    error: string | null;
}