import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Swipe from "./pages/swipe/Swipe";
import Messages from "./pages/messages/Messages";
import Profile from "./pages/profile/Profile";
import RegisterCoursesPage from "./pages/register/RegisterCoursesPage";
import RegisterFutureCoursesPage from "./pages/register/RegisterFutureCoursesPage";
import RegisterHobbies from "./pages/register/RegisterHobbiesPage";
import RegisterPreferencesPage from "./pages/register/RegisterPreferencesPage";
import RegisterInfoPage from "./pages/register/RegisterInfoPage";
import MessageUser from "./pages/messages/MessageUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Swipe />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "messages/:user",
        element: <MessageUser />,
      },
      {
        path: "register-courses",
        element: <RegisterCoursesPage />,
      },
      {
        path: "register-future-courses",
        element: <RegisterFutureCoursesPage />,
      },
      {
        path: "register-hobbies",
        element: <RegisterHobbies />,
      },
      {
        path: "register-preferences",
        element: <RegisterPreferencesPage />,
      },
      {
        path: "register-info",
        element: <RegisterInfoPage />,
      },
    ],
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
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
