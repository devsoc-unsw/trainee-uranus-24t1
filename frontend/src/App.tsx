import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import CourseButton from "./components/CourseButton";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1 className="text-3xl text-primary-500">Hello World</h1>
                <Link to="about">About Us</Link>
                <br/>
                <CourseButton course='1531'/>
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
