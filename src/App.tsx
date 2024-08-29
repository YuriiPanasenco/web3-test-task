import './App.css'
import DrinkListPage from "./pages/DrinkListPage";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DrinkListPage/>,
    },
    {
        path: "/favourites",
        element: <DrinkListPage favouriteOnly={true}/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
