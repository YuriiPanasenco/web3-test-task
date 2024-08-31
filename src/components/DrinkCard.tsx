import React, {useCallback} from 'react';
import {Drink} from "../dto/Drinks";
import StarIcon from "./ui-kit/StarIcon";
import ClickSoundWrapper from "./ui-kit/ClickSoundWrapper";
import StarRating from "./ui-kit/StarRating";
import {Exception} from "../dto/Exception";
import LoadingSpinner from "./ui-kit/LoadinSpinner";


type DrinkCardProps = {
    status: "display" | "loading" | "error";
    error: Exception;
    drink: Drink;
    isFavourite: boolean,
    onToggleFavourite: (drink: Drink, favourite: boolean) => void
    onOpen: (drink: Drink) => void,
    onRatingChange: (drink: Drink, rate: number) => void
    className?: string
};

const DrinkCard: React.FC<DrinkCardProps> = ({status, error, drink, isFavourite, onToggleFavourite, onOpen, className, onRatingChange}) => {

    const handleStarClick = useCallback(() => {
        onToggleFavourite(drink, !isFavourite);
    }, [drink, isFavourite, onToggleFavourite]);
    const handleImageClick = useCallback(() => {
        onOpen(drink);
    }, [drink, onOpen]);

    return (
        <div className={className}>
            <StarIcon isActive={isFavourite} onClick={handleStarClick}/>
            <div className="flex w-full flex-row gap-8">
                {status == 'loading' ? <LoadingSpinner/> :
                    <>
                        <div className="flex justify-center items-center mb-4">
                            <ClickSoundWrapper onClick={handleImageClick}>
                                <div className="w-24 h-40 bg-gray-200 flex items-center justify-center rounded">
                                    <img className="" src={drink.strDrinkThumb} loading="lazy"/>
                                </div>
                            </ClickSoundWrapper>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-left text-xl font-bold text-gray-900 mb-2">{drink.strDrink}</h2>
                                <p className="text-left text-gray-700 line-clamp-5">{drink.strInstructions}</p>
                            </div>
                            {"averageRating" in drink && <StarRating rating={drink.averageRating} onRatingChange={r => onRatingChange(drink, r)}/>}
                        </div>
                    </>}
            </div>
            {status == 'error' && <div className="bg-red-400 text-white">{error.message}</div>}
        </div>
    );
};

export default DrinkCard;
