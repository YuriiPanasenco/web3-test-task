import {Drink} from "../model/Drinks";
import {Category} from "../model/Categories";
import API from './API'

export default class FavouritesAPI extends API {
    protected static _instance: FavouritesAPI;
    private static LOCAL_STORAGE_KEY = "favourites";

    public static getInstance() {
        if (!FavouritesAPI._instance) {
            FavouritesAPI._instance = new FavouritesAPI();
        }
        return FavouritesAPI._instance;
    }

    /**
     * @param {string} search
     * @param {Category} category
     * @throws {InvalidAPIRequestException|Error}
     */
    public searchDrinks(search: string, category: Category): Promise<Drink[]> {
        return new Promise((resolve) => {
            try {
                const drinks: Drink[] = this.read()
                    .filter((d: Drink) => (
                        d.strDrink.includes(search) &&
                        (category ? d.strCategory == category.strCategory : true)
                    ));
                resolve(drinks);
            } catch {
                resolve([]);
            }
        });
    }


    public remove(drink: Drink) {
        return new Promise((resolve, reject) => {
            try {
                const drinks = this.read().filter(d => d.idDrink != drink.idDrink);
                resolve(this.write(drinks));
            } catch (error) {
                reject(error);
            }
        });
    }

    public add(drink: Drink) {
        return new Promise((resolve, reject) => {
            try {
                const drinks = this.read();
                drinks.push(drink);
                resolve(this.write(drinks));
            } catch (error) {
                reject(error);
            }
        });
    }


    private read(): Drink[] {
        try {
            const storedItem = localStorage.getItem(FavouritesAPI.LOCAL_STORAGE_KEY);
            if (storedItem) {
                return JSON.parse(storedItem);
            }
        } catch {
            //TODO: probably might be some other error expect the parse error
        }
        return [];
    }

    private write(drinks: Drink[]): boolean {
        try {
            localStorage.setItem(FavouritesAPI.LOCAL_STORAGE_KEY, JSON.stringify(drinks));
            return true;
        } catch {
            return false;
        }
    }
}