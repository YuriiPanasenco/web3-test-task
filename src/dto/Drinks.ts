export interface Drink {
    sourceId: string | BigInteger,
    idDrink: string | number;
    strDrink: string;
    strInstructions: string;
    strDrinkThumb: string;
    strCategory: string;
    strAlcoholic: string;
    alcoholPercentage: string;
    price: string;
    averageRating: string
    // Add other fields as needed

    isFavourite: boolean
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