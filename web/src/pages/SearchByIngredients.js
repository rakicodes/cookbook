import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getRecipes, reset } from "../features/recipes/recipesSlice";
import Header from "../ui/organisms/Header";
import SearchByIngredientsTemplate from "../ui/templates/SearchByIngredientsTemplate";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";

const SearchByIngredients = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [ingredients, setIngredients] = useState(
		searchParams.get("ingredients")
	);
	const [searchValue, setSearchValue] = useState("");

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.recipes
	);

	useEffect(() => {
		dispatch(getRecipes({ ingredients }));

		return () => {
			dispatch(reset())
		}
	}, [dispatch, ingredients]);

	useEffect(() => {
		setIngredients(searchParams.get("ingredients"));
	}, [searchParams]);

	if (isError) {
		return (
			<ErrorPageTemplate
				message={`Sorry it looks like something went wrong. ${message}`}
			/>
		);
	}
	return (
		<>
			<Header />
			{isLoading ? (
				<LoadingTemplate />
			) : (
				<SearchByIngredientsTemplate
					recipes={ingredients ? data : []}
					searchValue={searchValue}
					handleSearchChange={(e) => setSearchValue(e.target.value)}
					isSearch={ingredients?.length > 0}
				/>
			)}
		</>
	);
};

export default SearchByIngredients;
