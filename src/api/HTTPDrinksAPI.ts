import InvalidAPIRequestException from "./InvalidAPIRequestException";
import axios from "axios";
import {Drink} from "../dto/Drinks";
import {Category} from "../dto/Categories";
import API from './API'

export default class HTTPDrinksAPI extends API {

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
        this.generateIds(response?.data?.drinks);
        return this.addFavouriteParam(response.data.drinks);
    }

    async fetchRandomDrink(): Promise<Drink[]> {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        this.generateIds(response?.data?.drinks);
        return this.addFavouriteParam(response.data.drinks);
    }

    async fetchCategories(): Promise<Category[]> {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        this.generateIds(response?.data?.drinks);
        return response.data.drinks;
    }
}