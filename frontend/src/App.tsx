import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1 className="text-3xl text-primary-500">Hello World</h1>
                <Link to="about">About Us</Link>
            </div>
        ),
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
}

export default App;
