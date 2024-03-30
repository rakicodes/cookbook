import TextInput from "../../atoms/Input/TextInput";
import Button from "../../atoms/Buttons/Button";
import { Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignupForm = ({ name, email, password, handleSubmit }) => {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					item
					spacing={2}
					xs={12}>
					<Grid
						item
						xs={12}>
						<TextInput
							name={name.name}
							value={name.value}
							placeholder={name.placeholder}
							onChange={name.onChange}
							fullWidth="100%"
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextInput
							name={email.name}
							value={email.value}
							placeholder={email.placeholder}
							onChange={email.onChange}
							fullWidth="100%"
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextInput
							name={password.name}
							value={password.value}
							placeholder={password.placeholder}
							onChange={password.onChange}
							type={password.type}
							fullWidth="100%"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							justifyContent: "end",
						}}>
						<Typography
							variant="subtitle1"
							color="secondary"
							sx={{
								display: "flex",
								gap: 1,
							}}>
							Already have an account?
							<Link
								component={RouterLink}
								to="/login"
								color="secondary">
								Login
							</Link>
						</Typography>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						pt: 1,
					}}>
					<Button
						type="submit"
						variant="contained"
						text="Sign up"
						fullWidth="100%"
					/>
				</Grid>
			</form>
		</>
	);
};

export default SignupForm;
