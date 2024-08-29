import './App.css'
import DrinksPage from "./pages/DrinksPage";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DrinksPage/>,
    },
    {
        path: "/favourites",
        element: <DrinksPage favouriteOnly={true}/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
