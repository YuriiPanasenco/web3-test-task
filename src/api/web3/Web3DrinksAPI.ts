import {readContract, readContracts} from "@wagmi/core";
import {Drink} from "../../dto/Drinks";
import {Category} from "../../dto/Categories";
import API from '../API'
import {getUniqueByObjectProp} from "../../tools";
import {config} from "../../wagmi.config";
import {abi} from "./abi";


const CONTRACT_ADDRESS = '0xe9f1B66369b06588589226848a97738beaB283E5';


function mapResponseToDrink(response): Drink {
    const [name, imageUrl, category, alcoholPercentage, cocktailType, price, averageRating] = response;
    return {
        sourceId: "",
        idDrink: "",
        strInstructions: "",
        strDrink: name,
        strDrinkThumb: imageUrl,
        strCategory: category,
        alcoholPercentage,
        strAlcoholic: cocktailType,
        price: price.toString(),
        averageRating: averageRating.toString(),
        isFavourite: false
    }
}

export default class Web3DrinksAPI extends API {

    /**
     * @param {string} search
     * @param {Category} category
     * @throws {InvalidAPIRequestException|Error}
     */
    public async searchDrinks(search: string, category?: Category): Promise<Drink[]> {
        const rawCocktailData = await readContracts(config, {batchSize: 0, contracts: this.generateCallForGetCocktail(0, await this.getCount())});

        const drinks = rawCocktailData.map<Drink>((data, index): Drink => {
            const res = mapResponseToDrink(data.result);
            res.sourceId = index;
            return res;
        });

        this.generateIds(drinks);
        const uniqRecords: Drink[] = getUniqueByObjectProp(drinks, 'idDrink');
        return this.addFavouriteParam(uniqRecords).filter((d: Drink) => (
            d.strDrink.includes(search) &&
            (category ? d.strCategory == category.strCategory : true)
        ));
    }

    async fetchRandomDrink(): Promise<Drink[]> {
        const count = new Number(await this.getCount());
        const index = Math.floor(Math.random() * count)
        const rawCocktailData = await readContracts(config, {batchSize: 0, contracts: this.generateCallForGetCocktail(index, 1)});
        const drinks = rawCocktailData.map<Drink>((data, index): Drink => {
            const res = mapResponseToDrink(data.result);
            res.sourceId = index;
            return res;
        });
        this.generateIds(drinks);
        return this.addFavouriteParam(drinks);
    }

    async fetchCategories(): Promise<Category[]> {
        const drinks = await this.searchDrinks("");
        return this.selectUniqCategories(drinks);
    }


    private async getCount() {
        return await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: abi,
            functionName: 'getCockltailCount',
        });
    }

    private generateCallForGetCocktail(start: number, count: number) {
        const cocktailCalls = [];
        for (let i = 0; i < count; i++) {
            cocktailCalls.push({
                address: CONTRACT_ADDRESS,
                abi: abi,
                functionName: 'getCocktail',
                args: [start + i],
            });
        }
        return cocktailCalls;
    }
}