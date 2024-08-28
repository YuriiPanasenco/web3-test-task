import './App.css'
import HomePage from "./pages/HomePage";
import {RouterProvider} from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage, {HomePageLoader} from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        loader: HomePageLoader,
        children: [
            {
                // path: "team",
                // element: <Team />,
                // loader: teamLoader,
            },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
