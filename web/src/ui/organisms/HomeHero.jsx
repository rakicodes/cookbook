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
					text="Welcome to cookbook, where culinary creativity meets simplicity! From quick weeknight dinners to indulgent desserts, we've got you covered. Join us on a flavorful journey as we celebrate the joy of cooking and sharing delicious meals with loved ones!"
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
