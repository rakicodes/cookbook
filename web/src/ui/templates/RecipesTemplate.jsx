import CardsContainer from "../organisms/CardsContainer";
import SearchForm from "../molecules/SearchForm";
import CategoryNavBar from "../molecules/CategoryNavbar";
import Typography from "../atoms/Typography";
import { Box, Grid } from "@mui/material";
import theme from "../theme/theme";

const RecipesTemplate = ({
	recipes,
	category,
	categories,
	search,
	searchParams,
	handleSearchChange,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				pt: 4,
			}}>
			<Grid
				container
				spacing={2}
				sx={{
					maxWidth: theme.maxWidth,
				}}>
				<Grid
					item
					sx={{
						justifyContent: "center",
					}}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}>
							<SearchForm
								value={search}
								handleChange={handleSearchChange}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<Grid
								container
								sx={{ justifyContent: "center" }}>
								<Grid
									item
									xs={12}>
									<CategoryNavBar categories={categories} />
								</Grid>
							</Grid>
						</Grid>

						<Grid
							item
							xs={12}>
							<Box sx={{ pt: 2 }}>
								<Typography
									variant="h2"
									text={
										category
											? `Showing ${category} recipes`
											: searchParams
											? `Showing ${searchParams} results`
											: "Showing all recipes"
									}
								/>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}>
							<Box
								sx={{
									pt: 1,
								}}>
								<CardsContainer data={recipes} message="Sorry recipe not found!" />
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RecipesTemplate;
