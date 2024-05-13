import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import CourseButton from "./components/CourseButton";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";
import BackButton from "./components/BackButton";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1 className="text-3xl text-primary-500">Hello World</h1>
                <Link to="about">About Us</Link>
                <br/>
                <CourseButton course='COMP1531' disabled={false}/>
                <CourseButton course='COMP1511' disabled={true}/>
                <BackButton/>
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
