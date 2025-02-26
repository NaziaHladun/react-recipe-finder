import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritePage";

const router = createBrowserRouter([
  {
    path: "/react-recipe-finder/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/react-recipe-finder/recipe/:id", element: <RecipePage /> },
      { path: "/react-recipe-finder/favorites", element: <FavoritesPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
