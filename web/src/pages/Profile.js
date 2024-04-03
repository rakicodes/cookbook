import { useDispatch, useSelector } from "react-redux";
import Header from "../ui/organisms/Header";
import ProfileTemplate from "../ui/templates/ProfileTemplate";
import { getUserRecipes, reset } from "../features/recipes/recipesSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingTemplate from "../ui/templates/LoadingTemplate";
import ErrorPageTemplate from "../ui/templates/ErrorPageTemplate";
import { getUser, reset as resetUser } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipes,
  );

  const { data: authUser } = useSelector((state) => state.auth);
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserRecipes(id));
    dispatch(getUser(id));

    return () => {
      dispatch(reset());
      dispatch(resetUser());
    };
  }, [dispatch, id]);

  if (isError || isUserError) {
    return <ErrorPageTemplate message={`${message}`} />;
  }
  return (
    <>
      <Header />
      {isLoading || isUserLoading ? (
        <LoadingTemplate />
      ) : (
        <ProfileTemplate
          name={user.name}
          isUserProfile={authUser && user && authUser._id === user._id}
          recipes={data}
          handleNavigate={() => navigate("/addrecipe")}
        />
      )}
    </>
  );
};

export default Profile;
