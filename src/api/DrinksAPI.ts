import InvalidAPIRequestException from "./InvalidAPIRequestException";
import axios from "axios";
import {Drink} from "../model/Drinks";
import {Category} from "../model/Categories";
import API from './API'

export default class DrinksAPI extends API {
    protected static _instance: DrinksAPI;

    public static getInstance() {
        if (!DrinksAPI._instance) {
            DrinksAPI._instance = new DrinksAPI();
        }
        return DrinksAPI._instance;
    }

    /**
     * @param {string} search
     * @param {Category} category
     * @throws {InvalidAPIRequestException|Error}
     */
    public async searchDrinks(search: string, category: Category): Promise<Drink[]> {
        const params = [];
        if (search && search.length > 0) {
            params.push(`search.php?s=${search}`);
            if (category) {
                throw new InvalidAPIRequestException("The API doesn't allow filtering by multiple props");
            }
        } else if (category) {
            params.push(`filter.php?c=${category.strCategory}`);
        } else {
            params.push(`search.php?f=a`);
        }

        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${params.join('&')}`);
        return response.data.drinks;
    }
}