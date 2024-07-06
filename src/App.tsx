import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/pages/login/login-page";
import SignupPage from "./components/pages/signup/signup-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
