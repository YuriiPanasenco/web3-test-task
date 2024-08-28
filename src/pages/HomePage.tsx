import React, {useEffect, useState} from 'react';
import PageTemplate from "./PageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Drink} from "../model/Drinks";
import DrinkCard from "../components/DrinkCard";
import SearchInput from "../components/SearchInput";
import {fetchDrinks} from "../redux/slices/drink/drinkActions";
import NoSearchResults from "../components/NotFound";
import LoadingSpinner from "../components/LoadinSpinner";
import TagSelect from "../components/TagSelect/TagSelect";

// type FilterType = {
//     search: string
// }

const HomePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {drinks, loading, error} = useSelector((state: RootState) => state.drinks);

    const [search, changeSearch] = useState("");

    useEffect(() => {
        dispatch(fetchDrinks(search));
    }, [dispatch, search]);


    let renderComponent = <NoSearchResults/>;

    if (drinks && drinks.length) {
        renderComponent = drinks.map((drink: Drink) => (<DrinkCard key={drink.idDrink} drink={drink}/>));
    } else if (loading) {
        renderComponent = <LoadingSpinner/>;
    }


    return (
        <PageTemplate error={error}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex gap-1 justify-center items-center bg-gray-100 md:my-12 my-4">
                    <SearchInput searchHandler={(s) => changeSearch(s)} queryString={search}/>
                    <TagSelect/>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
                    {renderComponent}
                </div>
            </div>
        </PageTemplate>
    );
};

const HomePageLoader: React.FC = () => {
    return (<div>Loading</div>);
}

export default HomePage;
export {HomePageLoader};

