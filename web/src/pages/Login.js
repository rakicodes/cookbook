import LoginTemplate from "../ui/templates/LoginTemplate";
import { useEffect, useState } from "react";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "../ui/molecules/AlertSnackbar"; 
import Header from "../ui/organisms/Header";

const INITIAL_FORM = {
	email: "",
	password: "",
};

const Login = () => {
	const [formData, setFormData] = useState(INITIAL_FORM);
	const { email, password } = formData;
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false)
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			setSubmitted(false);
			setOpen(true);
		}
	}, [setOpen, isError, submitted]);

	useEffect(() => {
		if (isSuccess) {
			navigate("/");
		}
	}, [isSuccess, navigate])

	useEffect(() => {
		if (data) {
			navigate("/");
		}
	}, [data, navigate])

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true)
		dispatch(login(formData));
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
			<LoginTemplate
				email={{
					name: "email",
					value: email,
					placeholder: "Email",
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
				}}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default Login;
