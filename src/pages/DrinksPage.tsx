import React, {useCallback, useEffect, useState} from 'react';
import PageTemplate from "./PageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Drink, DrinksState} from "../model/Drinks";
import DrinkCard from "../components/DrinkCard";
import SearchInput from "../components/SearchInput";
import {fetchDrinks} from "../redux/slices/drink/drinkActions";
import NoSearchResults from "../components/NotFound";
import LoadingSpinner from "../components/LoadinSpinner";
import TagSelect from "../components/TagSelect/TagSelect";
import {CategoriesState} from "../model/Categories";
import {fetchCategories} from "../redux/slices/category/categoriesActions";
import Opps from "../components/Opps";
import {addFavourite, fetchFavourites, removeFavourite} from "../redux/slices/favourites/favouritesActions";

type DrinksPagePropsType = {
    favouriteOnly: boolean
}

const DrinksPage: React.FC<DrinksPagePropsType> = ({favouriteOnly = false}) => {
    const dispatch: AppDispatch = useDispatch();
    let drinksState: DrinksState = useSelector((state: RootState) => state.drinks);
    const categoriesState: CategoriesState = useSelector((state: RootState) => state.categories);
    const favouritesState: DrinksState = useSelector((state: RootState) => state.favourites);

    const [search, changeSearch] = useState("");
    const [category, changeCategory] = useState(null);

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


    let renderComponent = <NoSearchResults/>;

    if (drinksState.loading) {
        renderComponent = <LoadingSpinner/>;
    } else if (drinksState.drinks?.length) {
        renderComponent = <>{drinksState.drinks.map((drink: Drink) =>
            <DrinkCard key={drink.idDrink} drink={drink}
                onToggleFavourite={handleChangeFavourite}
                isFavourite={favouritesState.drinks.findIndex((d: Drink) => d.idDrink == drink.idDrink) >= 0}
            />
        )}</>;
    }

    if (drinksState.error || categoriesState.error) {
        renderComponent = <Opps error={drinksState.error || categoriesState.error}/>;
    }

    return (
        <PageTemplate>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex gap-1 justify-center items-center bg-gray-100 md:my-12 my-4">
                    <SearchInput clssName="w-full max-w-sm" searchHandler={(s) => changeSearch(s)} queryString={search}/>
                    <TagSelect
                        isMulti={false}
                        options={
                            categoriesState.categories.map(cat => ({
                                value: cat, label: cat.strCategory, active: false
                            }))}
                        onChange={(c => changeCategory(c[0]))}
                    />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
                    {renderComponent}
                </div>
            </div>
        </PageTemplate>
    );
};

export default DrinksPage;

