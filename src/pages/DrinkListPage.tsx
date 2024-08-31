import React, {useCallback, useEffect, useState} from 'react';
import PageTemplate from "./PageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Drink, DrinksState} from "../dto/Drinks";
import DrinkCard from "../components/DrinkCard";
import SearchInput from "../components/ui-kit/SearchInput";
import {addFavourite, fetchAllDrinks, fetchRandomDrink, removeFavourite} from "../redux/slices/drink/drinkActions";
import NoSearchResults from "../components/NotFound";
import LoadingSpinner from "../components/ui-kit/LoadinSpinner";
import TagSelect from "../components/TagSelect/TagSelect";
import {CategoriesState} from "../dto/Categories";
import {fetchCategories} from "../redux/slices/category/categoriesActions";
import Opps from "../components/Opps";
import Modal from "../components/ui-kit/Modal";
import Button from "../components/ui-kit/Button";
import API from "../api/API";
import {Exception} from "../dto/Exception";
import {deepCopy} from "../tools";

type DrinksPagePropsType<T extends API> = {
    api: T
    favouriteOnly: boolean
}

function DrinkListPage<T extends API>({api}: DrinksPagePropsType<T>): React.JSX {
    const dispatch: AppDispatch = useDispatch();
    const drinksState: DrinksState = useSelector((state: RootState) => state.drinkList);
    const categoriesState: CategoriesState = useSelector((state: RootState) => state.categories);

    const [search, changeSearch] = useState("");
    const [category, changeCategory] = useState(null);
    const [openDrinkDetail, changeOpenDrinkDetail]: [Drink | Exception | "loading", () => void] = useState(null);


    useEffect(() => {
        dispatch(fetchAllDrinks(api, search, category?.value));
    }, [dispatch, search, category, api]);

    useEffect(() => {
        dispatch(fetchCategories(api));
    }, [dispatch, api]);

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

    const handleFetchRandom = useCallback(() => {
        changeOpenDrinkDetail("loading");
        dispatch(fetchRandomDrink(api)).then((drink: Drink) => {
            changeOpenDrinkDetail(drink);
        }).catch(e => {
            changeOpenDrinkDetail(e);
        });
    }, [dispatch, changeOpenDrinkDetail, api]);


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
                                isFavourite={drink.isFavourite}
                            />
                        )}
                    </>}

                    {openDrinkDetail &&
                    <Modal isOpen={openDrinkDetail} onClose={handleCloseDetailModal}>
                        {typeof openDrinkDetail == 'string' ? <LoadingSpinner/> :
                            (openDrinkDetail instanceof Exception) ? <Opps error={openDrinkDetail}/>
                                : <div className="flex flex-col text-black text-left">
                                    <DrinkCard drink={openDrinkDetail}
                                        className="flex flex-col items-end"
                                        onToggleFavourite={() => {
                                            const copy = deepCopy(openDrinkDetail);
                                            copy.isFavourite = !copy.isFavourite;
                                            handleChangeFavourite(openDrinkDetail, copy.isFavourite);
                                            changeOpenDrinkDetail(copy);
                                        }}
                                        onOpen={handleGetDrinkDetail}
                                        isFavourite={openDrinkDetail.isFavourite}
                                    />
                                    <p><b>HashID: </b>{openDrinkDetail.idDrink}</p>
                                    <p><b>Category: </b>{openDrinkDetail.strCategory}</p>
                                </div>
                        }
                    </Modal>
                    }
                </div>
            </div>
        </PageTemplate>
    );
}

export default DrinkListPage;

