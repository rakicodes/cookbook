import HomepageTemplate from "../ui/templates/HomepageTemplate";
import Header from "../ui/organisms/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes, reset } from "../features/recipes/recipesSlice";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";
import { useNavigate } from "react-router-dom";

const categories = ["breakfast", "lunch/dinner", "snacks", "desserts"];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipesByCategory, setRecipesByCategory] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipes,
  );

  useEffect(() => {
    dispatch(getRecipes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    for (let i = 0; i < categories.length; i++) {
      setRecipesByCategory((prev) => ({
        ...prev,
        [categories[i]]: data
          .filter((recipe) => recipe.category === categories[i])
          .slice(0, 3),
      }));
    }
  }, [data]);

  const handleNavigate = (url) => {
    navigate(url);
  };

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
        <HomepageTemplate
          recipes={recipesByCategory}
          handleNavigate={handleNavigate}
          searchValue={search}
          handleSearchChange={(e) => setSearch(e.target.value)}
        />
      )}
    </>
  );
}

export default Home;
