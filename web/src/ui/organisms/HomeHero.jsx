import SearchForm from "../molecules/SearchForm";
import CategoryNavBar from "../molecules/CategoryNavbar";
import { Grid } from "@mui/material";
import Typography from "../atoms/Typography";

const categories = ["breakfast", "lunch/dinner", "snacks", "desserts"];
const HomeHero = ({ handleNavigate, searchValue, handleSearchChange }) => {
	return (
		<Grid
			container
			spacing={2}>
			<Grid
				item
				xs={12}>
				<Typography
					variant="h1"
					text="Looking for a recipe"
				/>
				<Typography
					variant="body1"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing. Donec vitae ante
					dict sit amet et justo."
				/>
				<SearchForm
					fullWidth="100%"
					handleAction={handleNavigate}
					value={searchValue}
					handleChange={handleSearchChange}
				/>
			</Grid>
			<Grid
				item
				xs={12}>
				<CategoryNavBar
					categories={categories}
					handleAction={handleNavigate}
				/>
			</Grid>
		</Grid>
	);
};

export default HomeHero;
