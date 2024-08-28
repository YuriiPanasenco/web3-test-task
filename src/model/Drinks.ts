export interface Drink {
    idDrink: string;
    strDrink: string;
    strInstructions: string;
    strDrinkThumb: string;
    // Add other fields as needed
}

export interface DrinksState {
    drinks: Drink[];
    loading: boolean;
    error: string | null;
}