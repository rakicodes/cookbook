import { useDispatch, useSelector } from "react-redux";
import SignupTemplate from "../ui/templates/SignupTemplate";
import { register } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "../ui/molecules/AlertSnackbar"; 
import Header from "../ui/organisms/Header";

const INITIAL_FORM = {
	name: "",
	email: "",
	password: "",
};

const Signup = () => {
	const [formData, setFormData] = useState(INITIAL_FORM);
	const { name, email, password } = formData;

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false)
	const navigate = useNavigate();

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			setSubmitted(false)
			setOpen(true);
		}

		if (isSuccess) {
			navigate("/recipes");
		}

	}, [setOpen, navigate, isError, isSuccess, submitted, dispatch]);

	useEffect(() => {
		if (data) {
			navigate("/recipes");
		}
	}, [data, navigate])

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true)
		dispatch(register(formData));
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
				message={message}
				handleClose={handleClose}
				severity="error"
			/>
			<Header />
			<SignupTemplate
				name={{
					name: "name",
					value: name,
					placeholder: "Name",
					onChange: (e) =>
						setFormData((prev) => ({
							...prev,
							name: e.target.value,
						})),
				}}
				email={{
					name: "email",
					value: email,
					placeholder: "Email address",
					onChange: (e) =>
						setFormData((prev) => ({
							...prev,
							email: e.target.value,
						})),
				}}
				password={{
					name: "password",
					value: password,
					placeholder: "Password",
					onChange: (e) =>
						setFormData((prev) => ({
							...prev,
							password: e.target.value,
						})),
					type: "password",
				}}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default Signup;
