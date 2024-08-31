import {Drink} from "../dto/Drinks";
import {Category} from "../dto/Categories";
import API from './API'
import {DJB2Hash} from "../tools";

export default class CacheAPI extends API {

    private cache: { [key: string]: { time: number, value } } = {};

    /**
     * @param api
     * @param saveTime in ms, default value is 60 sec
     */
    public constructor(
        private api: API,
        private saveTime = 1000 * 60) {
        super();
    }

    /**
     * @param {string} search
     * @param {Category} category
     * @throws {InvalidAPIRequestException|Error}
     */
    public async searchDrinks(search: string, category: Category): Promise<Drink[]> {
        const key = DJB2Hash("searchDrinks" + search + JSON.stringify(category));
        let cacheValue = this.cache[key];

        if ((!cacheValue) || cacheValue.time + this.saveTime < new Date().getTime()) {
            const res = await this.api.searchDrinks(search, category);
            cacheValue = {time: new Date().getTime(), value: res};
            this.cache[key] = cacheValue;
        }
        this.generateIds(cacheValue.value);
        return this.addFavouriteParam(cacheValue.value);
    }

    public fetchRandomDrink(): Promise<Drink[]> {
        this.cache = {};
        return this.api.fetchRandomDrink();
    }

    public async fetchCategories(): Promise<Category[]> {
        const key = "fetchCategories"
        let cacheValue = this.cache[key];

        if ((!cacheValue) || cacheValue.time + this.saveTime < new Date().getTime()) {
            const res = await this.api.fetchCategories();
            cacheValue = {time: new Date().getTime(), value: res};
            this.cache[key] = cacheValue;
        }
        return cacheValue.value;
    }

    public rateDrink(drink: Drink, rate: number): Promise<number> {
        this.cache = {};
        return this.api.rateDrink(drink, rate);
    }
}