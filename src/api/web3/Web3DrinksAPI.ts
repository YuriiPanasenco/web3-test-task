import {readContract, readContracts, sendTransaction, waitForTransactionReceipt, watchContractEvent} from "@wagmi/core";
import {Drink} from "../../dto/Drinks";
import {Category} from "../../dto/Categories";
import API from '../API'
import {getUniqueByObjectProp} from "../../tools";
import {config} from "../../wagmi.config";
import {abi} from "./abi";
import {encodeFunctionData} from "viem";


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

        const drinks = this.prepareData(rawCocktailData);

        return getUniqueByObjectProp(drinks, 'idDrink').filter((d: Drink) => (
            d.strDrink.includes(search) &&
            (category ? d.strCategory == category.strCategory : true)
        ));
    }

    async fetchRandomDrink(): Promise<Drink[]> {
        const count = new Number(await this.getCount());
        const index = Math.floor(Math.random() * count)
        const rawCocktailData = await readContracts(config, {batchSize: 0, contracts: this.generateCallForGetCocktail(index, 1)});
        return this.prepareData(rawCocktailData, index);
    }

    async fetchCategories(): Promise<Category[]> {
        const drinks = await this.searchDrinks("");
        return this.selectUniqCategories(drinks);
    }

    public async rateDrink(drink: Drink, rate: number): Promise<number> {

        const transactionHash = await sendTransaction(config, {
            to: CONTRACT_ADDRESS,
            data: encodeFunctionData({
                abi: abi,
                functionName: 'rateCocktail',
                args: [drink.sourceId, rate],
            }),
            value: '0x0',
        });

        await waitForTransactionReceipt(config, {hash: transactionHash});
        const rawCocktailData = await readContracts(config, {batchSize: 0, contracts: this.generateCallForGetCocktail(drink.sourceId as number, 1)});
        const newDrink = this.prepareData(rawCocktailData, drink.sourceId as number)[0];
        await this.updateFavourite(newDrink);
        return Number(newDrink.averageRating);
    }

    public addDrink(drink: Drink): Promise<void> {
        const generateIds = this.generateIds;
        return new Promise((resolve, reject) => {
            let unwatch = () => {
            };
            try {
                unwatch = watchContractEvent(config, {
                    address: CONTRACT_ADDRESS,
                    abi: abi,
                    eventName: 'CocktailAdded',
                    onLogs(logs) {
                        try {
                            logs.forEach(log => {
                                const tempDrink = {strDrink: log.args.name, strCategory: log.args.category, strDrinkThumb: drink.strDrinkThumb} as Drink;
                                generateIds([tempDrink]);
                                if (drink.idDrink == tempDrink.idDrink) {
                                    unwatch();
                                    resolve();
                                }
                            });
                        } catch (e) {
                            unwatch();
                            reject(e);
                        }
                    }
                });

                sendTransaction(config, {
                    to: CONTRACT_ADDRESS,
                    data: encodeFunctionData({
                        abi: abi,
                        functionName: 'addCocktail',
                        args: [drink.strDrink, drink.strDrinkThumb, drink.strCategory, 0, drink.strAlcoholic, 0],
                    }),
                    value: '0x0',
                }).catch((e) => {
                    unwatch();
                    reject(e);
                })
            } catch (e) {
                unwatch();
                reject(e);
            }
        })


        // const rawCocktailData = await readContracts(config, {batchSize: 0, contracts: this.generateCallForGetCocktail(drink.sourceId as number, 1)});
        // const newDrink = this.prepareData(rawCocktailData, drink.sourceId as number)[0];
        // await this.updateFavourite(newDrink);
        // return Number(newDrink.averageRating);
    }

    private prepareData(rawCocktailData, indexShift = 0): Drink[] {
        const drinks = rawCocktailData.map<Drink>((data, index): Drink => {
            const res = mapResponseToDrink(data.result);
            res.sourceId = index + indexShift;
            return res;
        });
        this.generateIds(drinks);
        return this.addFavouriteParam(drinks);
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