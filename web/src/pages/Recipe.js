import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, reset } from "../features/recipe/recipeSlice";
import { deleteRecipe } from "../features/recipes/recipesSlice";
import RecipeTemplate from "../ui/templates/RecipeTemplate";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";
import Header from "../ui/organisms/Header";

const Recipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserRecipe, setIsUserRecipe] = useState(false);

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe,
  );
  const { data: user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    navigate(`/profile/${user._id}`);
  };

  const handleEdit = () => {
    navigate(`/editrecipe/${id}`);
  };

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id, dispatch]);

  useEffect(() => {
    setIsUserRecipe(user && user._id === data.user);
  }, [user, data]);

  if (isError) {
    return <ErrorPageTemplate message={message} />;
  }

  if (isSuccess) {
    const { name, category, ingredients, steps, image } = data;

    return (
      <>
        <Header />
        {isLoading ? (
          <LoadingTemplate />
        ) : (
          <RecipeTemplate
            name={name}
            imageUrl={image}
            category={category}
            ingredients={ingredients}
            steps={steps}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isUserRecipe={isUserRecipe}
          />
        )}
      </>
    );
  }
};

export default Recipe;
