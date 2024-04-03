import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, reset } from "../features/recipes/recipesSlice";
import AddRecipeTemplate from "../ui/templates/AddRecipeTemplate";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "../ui/molecules/AlertSnackbar";
import Header from "../ui/organisms/Header";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [step, setStep] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState({});
  const [category, setCategory] = useState("breakfast");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  const {
    isError: isRecipesError,
    isSuccess: isRecipesSuccess,
    message: recipesMessage,
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, [data, navigate]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isRecipesError) {
      setSubmitted(false);
      setOpen(true);
    }

    if (submitted && isRecipesSuccess) {
      navigate(`/profile/${data._id}`);
    }
  }, [isRecipesError, isRecipesSuccess, data, navigate, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    setSubmitted(true);

    if (name.length) {
      data.append("name", name);
    }

    if (ingredients.length) {
      data.append("ingredients", JSON.stringify(ingredients));
    }

    if (!ingredients.length) {
      data.append("ingredients", []);
    }

    if (steps.length) {
      data.append("steps", JSON.stringify(steps));
    }

    if (!steps.length) {
      data.append("steps", []);
    }

    if (image?.name) {
      data.append("image", image);
    }

    data.append("category", category);
    dispatch(createRecipe(data));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
    }
    setIngredient("");
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (step) {
      setSteps([...steps, step]);
    }
    setStep("");
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <AlertSnackbar
        open={open}
        message={recipesMessage}
        handleClose={handleClose}
        severity="error"
      />
      <Header />
      <AddRecipeTemplate
        type="Add"
        title={{
          placeholder: "Recipe name",
          value: name,
          onChange: (e) => setName(e.target.value),
        }}
        ingredients={ingredients}
        ingredient={{
          placeholder: "Add an ingredient",
          value: ingredient,
          onChange: (e) => setIngredient(e.target.value),
        }}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={(item) =>
          setIngredients(
            ingredients.filter((ingredient) => item !== ingredient),
          )
        }
        steps={steps}
        step={{
          placeholder: "Add a step",
          value: step,
          onChange: (e) => setStep(e.target.value),
        }}
        handleAddStep={handleAddStep}
        handleDeleteStep={(item) =>
          setSteps(steps.filter((step) => item !== step))
        }
        handleImage={(e) => setImage(e.target.files[0])}
        options={["breakfast", "lunch/dinner", "desserts", "snacks"]}
        category={category}
        handleCategory={(e) => setCategory(e.target.value)}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddRecipe;
