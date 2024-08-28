import React from 'react';
import {Drink} from "../model/Drinks";
import {StarIcon} from '@heroicons/react/24/outline'

type DrinkCardProps = {
    drink: Drink;
};

const DrinkCard: React.FC<DrinkCardProps> = ({drink}) => {
    return (
        <div className="flex flex-col items-end border rounded-lg shadow-md w-full min-width-[90%] md:w-[45%] lg:w-[32%] p-4 bg-white">
            <StarIcon className="text-green-500" style={{width: '1.2rem', height: '1.2rem'}}/>
            <div className="flex w-full flex-row gap-8">
                <div className="flex justify-center items-center mb-4">
                    <div className="w-24 h-40 bg-gray-200 flex items-center justify-center rounded">
                        <img className="" src={drink.strDrinkThumb} loading="lazy"/>
                    </div>
                </div>
                <div>
                    <h2 className="text-left text-xl font-bold text-gray-900 mb-2">{drink.strDrink}</h2>
                    <p className="text-left text-gray-700 line-clamp-5">{drink.strInstructions}</p>
                </div>
            </div>
        </div>
    );
};

export default DrinkCard;
