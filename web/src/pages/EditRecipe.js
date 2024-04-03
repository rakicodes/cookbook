import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editRecipe } from "../features/recipes/recipesSlice";
import { getRecipe } from "../features/recipe/recipeSlice";
import EditRecipeTemplate from "../ui/templates/EditRecipeTemplate";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import Header from "../ui/organisms/Header";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";
import AlertSnackbar from "../ui/molecules/AlertSnackbar";

const EditRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe,
  );
  const { data: authData } = useSelector((state) => state.auth);
  const { user, name, category, ingredients, steps, image } = data;
  const {
    isError: isRecipesError,
    isSuccess: isRecipesSuccess,
    message: recipesMessage,
  } = useSelector((state) => state.recipes);
  const [editedName, setEditedName] = useState("");
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [editedIngredient, setEditedIngredient] = useState("");
  const [editedSteps, setEditedSteps] = useState([]);
  const [editedStep, setEditedStep] = useState("");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editedCategory, setEditedCategory] = useState(
    category ? category : "",
  );
  const [editedImage, setEditedImage] = useState(null);
  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id, dispatch]);
  useEffect(() => {
    setEditedName(data.name);
    setEditedIngredients(data.ingredients);
    setEditedSteps(data.steps);
    setEditedCategory(data.category);
  }, [data]);
  useEffect(() => {
    if (isRecipesError) {
      setSubmitted(false);
      setOpen(true);
    }

    if (submitted && isRecipesSuccess) {
      navigate(`/profile/${authData._id}`);
    }
  }, [isRecipesError, isRecipesSuccess, authData, navigate, submitted]);
  useEffect(() => {
    if (!authData || (user && user !== authData._id)) {
      navigate("/recipes");
    }
  }, [authData, user, navigate]);
  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (editedIngredient) {
      setEditedIngredients([...editedIngredients, editedIngredient]);
    }
    setEditedIngredient("");
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (editedStep) {
      setEditedSteps([...editedSteps, editedStep]);
    }
    setEditedStep("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = new FormData();
    data.append("name", editedName);
    data.append("ingredients", JSON.stringify(editedIngredients));
    data.append("steps", JSON.stringify(editedSteps));
    data.append("category", editedCategory);
    if (editedImage) {
      data.append("image", editedImage);
      data.append("isImageEdited", true);
    }

    dispatch(editRecipe({ id, data }));
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (isLoading) {
    return <LoadingTemplate />;
  }

  if (isError) {
    return <ErrorPageTemplate message={message} />;
  }

  if (isSuccess) {
    return (
      <>
        <AlertSnackbar
          open={open}
          message={recipesMessage}
          handleClose={handleClose}
          severity="error"
        />
        <Header />
        <EditRecipeTemplate
          type="Edit"
          title={{
            placeholder: "Recipe name",
            value: editedName,
            onChange: (e) => setEditedName(e.target.value),
            required: true,
          }}
          ingredients={editedIngredients}
          ingredient={{
            placeholder: "Add an ingredient",
            value: editedIngredient,
            onChange: (e) => setEditedIngredient(e.target.value),
            required: ingredients.length <= 0,
          }}
          handleAddIngredient={handleAddIngredient}
          handleDeleteIngredient={(item) =>
            setEditedIngredients(
              editedIngredients.filter((ingredient) => item !== ingredient),
            )
          }
          steps={editedSteps}
          step={{
            placeholder: "Add a step",
            value: editedStep,
            onChange: (e) => setEditedStep(e.target.value),
            required: steps.length <= 0,
          }}
          handleAddStep={handleAddStep}
          handleDeleteStep={(item) =>
            setEditedSteps(editedSteps.filter((step) => item !== step))
          }
          handleImage={(e) => setEditedImage(e.target.files[0])}
          options={["breakfast", "lunch/dinner", "desserts", "snacks"]}
          category={editedCategory}
          handleCategory={(e) => setEditedCategory(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </>
    );
  }
};

export default EditRecipe;
