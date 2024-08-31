import {Category} from "../dto/Categories";
import {Drink} from "../dto/Drinks";
import {deepCopy} from "../tools";

const LOCAL_STORAGE_KEY = "favourites";

export default abstract class API {
    public static getInstance(): API {
        throw new Error("The getInstance method doesn't have implementation in the API class")
    }


    public abstract async searchDrinks(search: string, category: Category): Promise<Drink[]>

    public abstract async fetchRandomDrink(): Promise<Drink[]>

    public removeFavourite(drink: Drink): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const drinks = this.readFavourite().filter(d => d.idDrink != drink.idDrink);
                resolve(this.writeFavourite(drinks));
            } catch (error) {
                reject(error);
            }
        });
    }

    public addFavourite(drink: Drink): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                drink = deepCopy(drink);
                drink.isFavourite = true;
                const drinks = this.readFavourite();
                drinks.push(drink);
                resolve(this.writeFavourite(drinks));
            } catch (error) {
                reject(error);
            }
        });
    }


    protected readFavourite(): Drink[] {
        try {
            const storedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedItem) {
                return JSON.parse(storedItem);
            }
        } catch {
            //TODO: probably might be some other error expect the parse error
        }
        return [];
    }

    protected writeFavourite(drinks: Drink[]): boolean {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drinks));
            return true;
        } catch {
            return false;
        }
    }
}

export type AnyAPIInstanceType<T extends API> = {
    new(...args: []): T;  // Constructor signature
    // getInstance(): T;         // Static method signature
};

export function apiFactory<T extends API>(api: AnyAPIInstanceType<T>) {
    const instance = new api();
    return {
        getInstance(): API {
            return instance;
        }
    }
}