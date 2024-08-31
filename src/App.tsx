import './App.css'
import DrinkListPage from "./pages/DrinkListPage";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HTTPDrinksAPI from "./api/HTTPDrinksAPI";
import FavouritesAPI from "./api/FavouritesAPI";
import {apiFactory} from "./api/API";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DrinkListPage api={apiFactory(HTTPDrinksAPI)}/>,
    },
    {
        path: "/favourites",
        element: <DrinkListPage api={apiFactory(FavouritesAPI)}/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
