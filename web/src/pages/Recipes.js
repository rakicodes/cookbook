import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getRecipes, reset } from "../features/recipes/recipesSlice";
import RecipesTemplate from "../ui/templates/RecipesTemplate";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";
import Header from "../ui/organisms/Header";

const categories = ["breakfast", "lunch/dinner", "snacks", "desserts"];
// recipes refresh doesn't refresh to all recipes when going from category to all

const Recipes = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = useState(searchParams.get("category"));
	const [search, setSearch] = useState(searchParams.get("search"));
	const [inputSearch, setInputSearch] = useState("");

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.recipes
	);
	useEffect(() => {
		dispatch(getRecipes({ category, search }));

		return () => {
			dispatch(reset())
		}
	}, [dispatch, category, search]);

	useEffect(() => {
		setCategory(searchParams.get("category"));
		setSearch(searchParams.get("search"));
	}, [searchParams]);

	if (isError) {
		return (
			<ErrorPageTemplate
				message={`Sorry it looks like something went wrong. ${message}`}
			/>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Header />
				{isLoading ? (
					<LoadingTemplate />
				) : (
					<RecipesTemplate
						recipes={data}
						category={category}
						categories={categories}
						searchParams={search}
						search={inputSearch}
						handleSearchChange={(e) => setInputSearch(e.target.value)}
					/>
				)}
			</>
		);
	}
};

export default Recipes;
