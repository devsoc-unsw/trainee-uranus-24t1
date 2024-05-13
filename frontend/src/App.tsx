import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import CourseButton from "./components/AdaptableButton";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";
import BackButton from "./components/BackButton";
import AdaptableButton from "./components/AdaptableButton";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1 className="text-3xl text-primary-500">Hello World</h1>
        <Link to="about">About Us</Link>
        <br/>
        <AdaptableButton label='COMP1531' disabled={false}/>
        <AdaptableButton label='COMP1511' disabled={true}/>
        <br/>

        <BackButton/>
        <br/>
        <AdaptableButton label="hi" disabled={false} showDash/>
        <AdaptableButton label="goodsoup"/>

        <br/>

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
