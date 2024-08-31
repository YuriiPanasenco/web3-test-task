import './App.css'
import DrinkListPage from "./pages/DrinkListPage";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HTTPDrinksAPI from "./api/HTTPDrinksAPI";
import FavouritesAPI from "./api/FavouritesAPI";
import Web3DrinksAPI from "./api/web3/Web3DrinksAPI";
import Page404 from "./pages/404Page";
import CacheAPI from "./api/CacheAPI";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DrinkListPage api={new CacheAPI(new HTTPDrinksAPI())}/>,
    },
    {
        path: "/favourites",
        element: <DrinkListPage api={new FavouritesAPI()}/>
    },
    {
        path: "/web3",
        element: <DrinkListPage api={new CacheAPI(new Web3DrinksAPI())}/>
    },
    {
        path: "/*",
        element: <Page404/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
