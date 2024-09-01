import React from 'react';
import {Drink} from "../../dto/Drinks";
import DetailedDrinkCard from "../../components/DetailedDrinkCard";
import LoadingSpinner from "../../components/ui-kit/LoadinSpinner";
import Opps from "../../components/Opps";
import Modal from "../../components/ui-kit/Modal";
import Button from "../../components/ui-kit/Button";
import {Exception} from "../../dto/Exception";
import {RatingStage} from "../../components/PreviewDrinkCard";


type DetailDrinkModalModalPropsType = {
    openDrinkDetail: Drink | Exception | "loading",
    onClose: () => void
    onToggleFavourite: () => void
    onRatingChange: () => void
    ratingStage: RatingStage
    handleAddToWeb3: (drink: Drink) => void
}
const DetailDrinkModal: React.FC<DetailDrinkModalModalPropsType> = ({
    openDrinkDetail,
    onClose,
    onToggleFavourite,
    onRatingChange,
    ratingStage,
    handleAddToWeb3
}) => {
    return (
        <Modal onClose={onClose}
            actions={!openDrinkDetail?.averageRating && <Button text="Add to contract" onClick={() => handleAddToWeb3(openDrinkDetail as Drink)}/>}>
            {typeof openDrinkDetail === 'string' ? <LoadingSpinner/> :
                openDrinkDetail instanceof Exception ? <Opps error={openDrinkDetail}/> :

                    <DetailedDrinkCard drink={openDrinkDetail}
                        onToggleFavourite={onToggleFavourite}
                        onRatingChange={onRatingChange}
                        ratingStage={ratingStage}


                    />
            }
        </Modal>

    );
}

export default DetailDrinkModal;