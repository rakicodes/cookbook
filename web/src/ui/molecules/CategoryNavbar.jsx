import { Grid } from "@mui/material";
import Button from "../atoms/Buttons/Button";
import TextInput from "../atoms/Input/TextInput";

const CategoryNavbar = ({ categories, handleAction }) => {
	return (
		<Grid
			container
			spacing={1}>
			{categories.map((category, i) => (
				<Grid
					key={i}
					item
					xs={6}
					sm={3}>
					<form
						key={i}
						name="category">
						<TextInput
							name="category"
							value={category}
							hidden
						/>
						<Button
							type={handleAction ? "button" : "submit"}
							name="category"
							text={category}
							color="secondary"
							variant="contained"
							fullWidth="100%"
							action={handleAction && (() => handleAction(`/recipes?category=${category}`))}
						/>
					</form>
				</Grid>
			))}
		</Grid>
	);
};

export default CategoryNavbar;
