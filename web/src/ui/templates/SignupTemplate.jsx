import Header from "../organisms/Header";
import { Box, Grid } from "@mui/material";
import SignupForm from "../organisms/Forms/SignupForm";
import theme from "../theme/theme";
import Typography from "../atoms/Typography";

const SignupTemplate = ({ name, email, password, handleSubmit }) => {
	return (
		<Box sx={{
			minHeight: "90vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			px: 2
		}}>
			<Grid
				container
				sx={{
					maxWidth: theme.maxWidth
				}}>
						<Grid
							item
							xs={12}
							sx={{
								pb: 2
							}}>
							<Typography
								variant="h2"
								text="Sign up"
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<SignupForm
								name={name}
								email={email}
								password={password}
								handleSubmit={handleSubmit}
							/>
						</Grid>

			</Grid>
		</Box>
	);
};

export default SignupTemplate;
