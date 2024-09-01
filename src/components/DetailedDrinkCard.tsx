import React, {useCallback} from 'react';
import {Drink} from "../dto/Drinks";
import StarIcon from "./ui-kit/StarIcon";
import StarRating from "./ui-kit/StarRating";
import LoadingSpinner from "./ui-kit/LoadinSpinner";
import {RatingStage} from "./PreviewDrinkCard";


type DrinkCardProps = {
    drink: Drink;
    onToggleFavourite: (drink: Drink, favourite: boolean) => void
    onRatingChange: (drink: Drink, rate: number) => void
    className?: string,
    ratingStage: RatingStage
};

const DetailedDrinkCard: React.FC<DrinkCardProps> = ({drink, onToggleFavourite, onRatingChange, ratingStage}) => {
    const handleStarClick = useCallback(() => {
        onToggleFavourite(drink, !drink.isFavourite);
    }, [drink, onToggleFavourite]);

    const status = ratingStage?.drink?.idDrink === drink.idDrink ? ratingStage.status : 'display';
    const ingredients = Array.from({length: 14}, (_, index) => drink['strIngredient' + (index + 1)]).filter(i => !!i).join(",");

    return (
        <div className="flex flex-col text-black text-left">
            <div className="flex flex-col items-end">
                <StarIcon isActive={drink.isFavourite} onClick={handleStarClick}/>
                <div className="flex w-full flex-row gap-8">
                    {status == 'loading' ? <LoadingSpinner/> :
                        <>
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-64 h-80 bg-gray-200 flex items-center justify-center rounded overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src={drink.strDrinkThumb}
                                        loading="lazy"
                                        alt="Drink Image"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-left text-xl font-bold text-gray-900 mb-2">{drink.strDrink}</h2>
                                    <p><b>HashID: </b>{drink.idDrink}</p>
                                    <p><b>Category: </b>{drink.strCategory}</p>
                                    <p><b>Type: </b>{drink.strAlcoholic}</p>
                                    <p><b>Ingredients: </b>{ingredients}</p>

                                    <p className="text-left text-gray-700"><b>Instruction:</b> {drink.strInstructions}</p>
                                </div>
                                {"averageRating" in drink && <StarRating rating={drink.averageRating} onRatingChange={r => onRatingChange(drink, r)}/>}
                            </div>
                        </>}
                </div>
                {status == 'error' && <div className="bg-red-400 text-white w-full overflow-hidden line-clamp-5">{ratingStage?.error?.message}</div>}
            </div>

        </div>
    );
};

export default DetailedDrinkCard;
