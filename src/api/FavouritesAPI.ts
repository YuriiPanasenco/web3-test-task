import {Drink} from "../dto/Drinks";
import {Category} from "../dto/Categories";
import API from './API'
import {Exception} from "../dto/Exception";

export default class FavouritesAPI extends API {

    /**
     * @param {string} search
     * @param {Category} category
     * @throws {InvalidAPIRequestException|Error}
     */
    public searchDrinks(search: string, category: Category): Promise<Drink[]> {
        return new Promise((resolve) => {
            try {
                const drinks: Drink[] = this.readFavourite()
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

    async fetchRandomDrink(): Promise<Drink[]> {
        const drinks = this.readFavourite();
        if (drinks.length == 0) {
            return Promise.reject(new Exception("No Drinks in this list to get a random one"));
        }
        const randomIndex = Math.floor(Math.random() * drinks.length);
        return Promise.resolve([drinks[randomIndex]]);
    }

}