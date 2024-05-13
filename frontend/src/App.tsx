import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppProvider from "./contexts/AppContext";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/Login";

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
