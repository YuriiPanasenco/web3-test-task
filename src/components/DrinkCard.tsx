import React, {useCallback} from 'react';
import {Drink} from "../model/Drinks";
import StarIcon from "./ui-kit/StarIcon";


type DrinkCardProps = {
    drink: Drink;
    isFavourite: boolean,
    onToggleFavourite: (drink: Drink, favourite: boolean) => void
};

const DrinkCard: React.FC<DrinkCardProps> = ({drink, isFavourite, onToggleFavourite}) => {

    const handleStarClick = useCallback(() => {
        onToggleFavourite(drink, !isFavourite);
    }, [drink, isFavourite, onToggleFavourite]);

    return (
        <div className="flex flex-col items-end border rounded-lg shadow-md w-full min-width-[90%] md:w-[45%] lg:w-[32%] p-4 bg-white">
            <StarIcon isActive={isFavourite} onClick={handleStarClick}/>
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
