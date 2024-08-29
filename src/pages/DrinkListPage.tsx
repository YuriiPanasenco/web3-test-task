import React, {useCallback, useEffect, useState} from 'react';
import PageTemplate from "./PageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Drink, DrinksState} from "../dto/Drinks";
import DrinkCard from "../components/DrinkCard";
import SearchInput from "../components/ui-kit/SearchInput";
import {fetchDrinks, fetchRandomDrink} from "../redux/slices/drink/drinkActions";
import NoSearchResults from "../components/NotFound";
import LoadingSpinner from "../components/ui-kit/LoadinSpinner";
import TagSelect from "../components/TagSelect/TagSelect";
import {CategoriesState} from "../dto/Categories";
import {fetchCategories} from "../redux/slices/category/categoriesActions";
import Opps from "../components/Opps";
import {addFavourite, fetchFavourites, removeFavourite} from "../redux/slices/favourites/favouritesActions";
import Modal from "../components/ui-kit/Modal";
import Button from "../components/ui-kit/Button";

type DrinksPagePropsType = {
    favouriteOnly: boolean
}

const DrinkListPage: React.FC<DrinksPagePropsType> = ({favouriteOnly = false}) => {
    const dispatch: AppDispatch = useDispatch();
    let drinksState: DrinksState = useSelector((state: RootState) => state.drinkList);
    const categoriesState: CategoriesState = useSelector((state: RootState) => state.categories);
    const favouritesState: DrinksState = useSelector((state: RootState) => state.favourites);

    const [search, changeSearch] = useState("");
    const [category, changeCategory] = useState(null);
    const [openDrinkDetail, changeOpenDrinkDetail] = useState(null);

    if (favouriteOnly) {
        drinksState = favouritesState;
    }

    useEffect(() => {
        dispatch(fetchFavourites(search, category?.value));
        if (!favouriteOnly) {
            dispatch(fetchDrinks(search, category?.value));
        }
    }, [dispatch, search, category, favouriteOnly]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChangeFavourite = useCallback((drink: Drink, favourite: boolean) => {
        if (favourite) {
            dispatch(addFavourite(drink));
        } else {
            dispatch(removeFavourite(drink));
        }
    }, [dispatch]);

    const handleGetDrinkDetail = (drink: Drink) => {
        changeOpenDrinkDetail(drink);
    };
    const handleCloseDetailModal = () => {
        changeOpenDrinkDetail(null);
    };

    const handleFetchRandom = useCallback(() => {
        dispatch(fetchRandomDrink()).then((drink: Drink) => {
            changeOpenDrinkDetail(drink);
        });
    }, [dispatch, changeOpenDrinkDetail]);


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
                            <DrinkCard key={drink.idDrink} drink={drink}
                                className="flex flex-col items-end border rounded-lg shadow-md w-full min-width-[90%] md:w-[45%] lg:w-[32%] p-4 bg-white"
                                onToggleFavourite={handleChangeFavourite}
                                onOpen={handleGetDrinkDetail}
                                isFavourite={favouritesState.drinks.findIndex((d: Drink) => d.idDrink == drink.idDrink) >= 0}
                            />
                        )}
                    </>}

                    {!openDrinkDetail ? "" :
                        <Modal isOpen={openDrinkDetail} onClose={handleCloseDetailModal}>
                            <DrinkCard drink={openDrinkDetail}
                                className="flex flex-col items-end"
                                onToggleFavourite={handleChangeFavourite}
                                onOpen={handleGetDrinkDetail}
                                isFavourite={favouritesState.drinks.findIndex((d: Drink) => d.idDrink == openDrinkDetail.idDrink) >= 0}
                            />
                        </Modal>
                    }
                </div>
            </div>
        </PageTemplate>
    );
};

export default DrinkListPage;

