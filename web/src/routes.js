import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import ErrorPageTemplate from "./ui/templates/ErrorPageTemplate";
import Profile from "./pages/Profile";
import SearchByIngredients from "./pages/SearchByIngredients";

const router = createBrowserRouter([
	{
		errorElement: <ErrorPageTemplate message={`Sorry the page you're looking for doesn't exist.`}/>,
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/recipes",
		element: <Recipes />,
	},
	{
		path: "/recipe/:id",
		element: <Recipe />,
	},
	{
		path: "/addrecipe",
		element: <AddRecipe />,
	},
	{
		path: "/editrecipe/:id",
		element: <EditRecipe />,
	},
	{
		path: "/profile/:id",
		element: <Profile />,
	},
	{
		path: "/searchByIngredients",
		element: <SearchByIngredients />,
	},
]);

export default router;
