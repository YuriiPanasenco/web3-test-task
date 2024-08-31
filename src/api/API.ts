import {Category} from "../dto/Categories";
import {Drink} from "../dto/Drinks";
import {deepCopy, hashObject} from "../tools";
import InvalidAPIRequestException from "./InvalidAPIRequestException";
import {Exception} from "../dto/Exception";

const LOCAL_STORAGE_KEY = "favourites";

export default abstract class API {

    public abstract async searchDrinks(search: string, category: Category): Promise<Drink[]>

    public abstract async fetchRandomDrink(): Promise<Drink[]>

    public abstract async fetchCategories(): Promise<Category[]>

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

    /**
     * @param drink
     * @param rate 1-5
     * @return Promise<number> - new average rate
     * @throws InvalidAPIRequestException - is the API doesn't support this functionality
     */
    public async rateDrink(drink: Drink, rate: number): Promise<number> {
        throw new InvalidAPIRequestException("The API instance doesn't support rating a drinks", {drink, rate});
    }

    protected generateIds(drinks: Drink[] = []) {
        if (!drinks) return;
        drinks.forEach(d => {
            d.idDrink = hashObject(d, ['strDrink', 'strDrinkThumb', 'strCategory'])
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

    protected async updateFavourite(drink: Drink): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                drink = deepCopy(drink);
                const drinks = this.readFavourite();
                const index = drinks.findIndex(d => d.idDrink == drink.idDrink);
                if (!index) reject(new Exception("Trying to update not favourite drink: " + drink));
                drinks[index] = drink;
                resolve(this.writeFavourite(drinks));
            } catch (error) {
                reject(error);
            }
        });
    }

    protected addFavouriteParam(drinks: Drink[]): Drink[] {
        if (!drinks) return drinks;
        const fawDrinks: Array<Drink> = this.readFavourite();
        drinks.forEach(drink => {
            const fawIndex = fawDrinks.findIndex(fawDrink => fawDrink.idDrink == drink.idDrink);
            drink.isFavourite = fawIndex >= 0;
        });
        return drinks;
    }

    protected selectUniqCategories(drinks: Drink[]): Category[] {
        if (!drinks || drinks.length == 0) return [];
        const categoryNames = drinks.reduce((acc: string[], current: Drink) => {
            if (!acc.includes(current.strCategory)) {
                acc.push(current.strCategory);
            }
            return acc;
        }, []);

        return categoryNames.map(c => ({strCategory: c}));
    }
}

