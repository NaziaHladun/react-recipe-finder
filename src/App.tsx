import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/recipe/:id", element: <RecipePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
