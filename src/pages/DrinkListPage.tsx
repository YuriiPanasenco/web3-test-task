import React, {useCallback, useEffect, useState} from 'react';
import PageTemplate from "./PageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Drink, DrinksState} from "../dto/Drinks";
import SearchInput from "../components/ui-kit/SearchInput/SearchInput";
import {addFavourite, fetchAllDrinks, fetchRandomDrink, rateDrink, removeFavourite} from "../redux/slices/drink/drinkActions";
import NoSearchResults from "../components/NotFound";
import LoadingSpinner from "../components/ui-kit/LoadinSpinner";
import TagSelect from "../components/TagSelect/TagSelect";
import {CategoriesState} from "../dto/Categories";
import {fetchCategories} from "../redux/slices/category/categoriesActions";
import Opps from "../components/Opps";
import Button from "../components/ui-kit/Button";
import API from "../api/API";
import {Exception} from "../dto/Exception";
import {deepCopy} from "../tools";
import {useEnsureSepoliaNetwork} from "../hooks/web3/useEnsureSepoliaNetwork";
import PreviewDrinkCard from "../components/PreviewDrinkCard";
import DetailDrinkModal from "./DrinkListPage/DetailDrinkModal";

type DrinksPagePropsType<T extends API> = {
    api: T
    favouriteOnly: boolean
}

type RatingStage = { status: "loading" | "error", drink: Drink, error: Exception } | null;
type DetailedDrinkModal = Drink | Exception | "loading";

function DrinkListPage<T extends API>({api}: DrinksPagePropsType<T>): React.JSX {
    const [switchToSepoliaError] = useEnsureSepoliaNetwork();
    const dispatch: AppDispatch = useDispatch();
    const drinksState: DrinksState = useSelector((state: RootState) => state.drinkList);
    const categoriesState: CategoriesState = useSelector((state: RootState) => state.categories);

    const [search, changeSearch] = useState("");
    const [category, changeCategory] = useState(null);
    const [openDrinkDetail, changeOpenDrinkDetail]: [DetailedDrinkModal, (DetailedDrinkModal) => void] = useState(null);
    const [ratingState, changeRatingState]: [RatingStage, (RatingStage) => void] = useState(null);


    useEffect(() => {
        dispatch(fetchAllDrinks(api, search, category?.value));
    }, [dispatch, search, category, api, switchToSepoliaError]);
    useEffect(() => {
        dispatch(fetchCategories(api));
        changeRatingState(null);
    }, [dispatch, api, switchToSepoliaError]);

    const handleChangeFavourite = useCallback((drink: Drink, favourite: boolean) => {
        if (favourite) {
            dispatch(addFavourite(api, drink));
        } else {
            dispatch(removeFavourite(api, drink));
        }
    }, [api, dispatch]);

    const handleGetDrinkDetail = (drink: Drink) => {
        changeOpenDrinkDetail(drink);
    };
    const handleCloseDetailModal = () => {
        changeOpenDrinkDetail(null);
    };

    const handleFetchRandom = useCallback(async () => {
        changeOpenDrinkDetail("loading");
        try {
            const drink: Drink = await dispatch(fetchRandomDrink(api));
            changeOpenDrinkDetail(drink);
        } catch (e) {
            changeOpenDrinkDetail(e);
        }
    }, [dispatch, changeOpenDrinkDetail, api]);

    const handleOnRatingChange = useCallback(async (drink: Drink, setRate: number) => {
        changeRatingState({status: "loading", drink, error: null});
        try {
            const newRate = await dispatch(rateDrink(api, drink, setRate));
            changeRatingState(null);
            changeOpenDrinkDetail((prev: Drink) => prev && "averageRating" in prev ? {...prev, averageRating: newRate} : prev);
        } catch (e) {
            changeRatingState({status: "error", drink, error: e});
        }
    }, [dispatch, api]);

    let renderComponent;

    if (drinksState.loading) {
        renderComponent = <LoadingSpinner/>;
    } else if (!drinksState.drinks?.length) {
        renderComponent = <NoSearchResults/>;
    }

    if (drinksState.error || categoriesState.error) {
        renderComponent = <Opps error={drinksState.error || categoriesState.error}/>;
    }

    return (
        <PageTemplate>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-1 justify-center items-center bg-gray-100 md:mb-12 my-4">
                    <SearchInput clssName="w-full max-w-sm" searchHandler={(s) => changeSearch(s)} queryString={search}/>
                    <TagSelect
                        isMulti={false}
                        options={
                            categoriesState.categories.map(cat => ({
                                value: cat, label: cat.strCategory, active: false
                            }))}
                        placeholder="Select category"
                        onChange={(c => changeCategory(c[0]))}
                    />
                    <Button text="Get Random Cocktail" onClick={handleFetchRandom}/>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
                    {renderComponent ? renderComponent : <>
                        {drinksState.drinks.map((drink: Drink) =>
                            <PreviewDrinkCard key={drink.idDrink} drink={drink}
                                className="flex flex-col items-end border rounded-lg shadow-md w-full min-width-[90%] md:w-[45%] lg:w-[32%] p-4 bg-white"
                                onToggleFavourite={handleChangeFavourite}
                                onRatingChange={handleOnRatingChange}
                                onOpen={handleGetDrinkDetail}
                                ratingStage={ratingState}
                            />
                        )}
                    </>}

                    {openDrinkDetail && (
                        <DetailDrinkModal
                            openDrinkDetail={openDrinkDetail}
                            onClose={handleCloseDetailModal}
                            onToggleFavourite={() => {
                                const copy = deepCopy(openDrinkDetail);
                                copy.isFavourite = !copy.isFavourite;
                                handleChangeFavourite(openDrinkDetail, copy.isFavourite);
                                changeOpenDrinkDetail(copy);
                            }}
                            onRatingChange={handleOnRatingChange}
                            ratingStage={ratingState}
                            handleAddToWeb3={(dr) => consol.log(dr)}
                        />)}
                </div>
            </div>
        </PageTemplate>
    )
    ;
}

export default DrinkListPage;

