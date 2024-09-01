import React, {useCallback} from 'react';
import {Drink} from "../dto/Drinks";
import StarIcon from "./ui-kit/StarIcon";
import ClickSoundWrapper from "./ui-kit/ClickSoundWrapper";
import StarRating from "./ui-kit/StarRating";
import {Exception} from "../dto/Exception";
import LoadingSpinner from "./ui-kit/LoadinSpinner";

export type RatingStage = { status: "loading" | "error", drink: Drink, error: Exception } | null;

type DrinkCardProps = {
    className?: string
    drink: Drink;
    onToggleFavourite: (drink: Drink, favourite: boolean) => void
    onOpen: (drink: Drink) => void,
    ratingStage: RatingStage
    onRatingChange: (drink: Drink, rate: number) => void
};

const PreviewDrinkCard: React.FC<DrinkCardProps> = ({
    className,
    drink,
    onToggleFavourite, onOpen,
    ratingStage, onRatingChange
}) => {
    const status = ratingStage?.drink?.idDrink === drink.idDrink ? ratingStage.status : 'display';
    const handleStarClick = useCallback(() => {
        onToggleFavourite(drink, !drink.isFavourite);
    }, [drink, onToggleFavourite]);
    const handleImageClick = useCallback(() => {
        onOpen(drink);
    }, [drink, onOpen]);

    return (
        <div className={className}>
            <StarIcon isActive={drink.isFavourite} onClick={handleStarClick}/>
            <div className="flex w-full flex-row gap-8">
                {status == 'loading' ? <LoadingSpinner/> :
                    <>
                        <div className="flex justify-center items-center mb-4">
                            <ClickSoundWrapper onClick={handleImageClick}>
                                <div className="w-24 h-40 bg-gray-200 flex items-center justify-center">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src={drink.strDrinkThumb}
                                        loading="lazy"
                                        alt="Drink Image"
                                    />
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
            {status == 'error' && <div className="bg-red-400 text-white w-full overflow-hidden line-clamp-5">{ratingStage?.error?.message}</div>}
        </div>
    );
};

export default PreviewDrinkCard;
