import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1 className="text-3xl text-primary-500">Hello World</h1>
                <Link to="about">About Us</Link>
                <Link to="register">Register</Link>
            </div>
        ),
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);

function App() {
    return (
        <AppProvider>
            <div className="p-10 text-black">
                <RouterProvider router={router} />
            </div>
        </AppProvider>
    );
}

export default App;
