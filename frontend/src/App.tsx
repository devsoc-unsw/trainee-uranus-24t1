import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Messages from "./pages/messages/Messages";
import Matches from "./pages/matches/Matches";
import CurrentCourses from "./pages/courses/CurrentCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/register/current-courses",
    element: <CurrentCourses />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },

  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "matches",
    element: <Matches />,
  },
  {
    path: "messages",
    element: <Messages />,
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
