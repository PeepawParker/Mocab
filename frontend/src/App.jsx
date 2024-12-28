import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import NavBar from "./Pages/NavBar/Navbar";
import UserHome from "./Pages/HomePage/UserHome";
import LoginPage from "./Pages/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: "ErrorPage",
    children: [
      { path: "", element: <UserHome /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
