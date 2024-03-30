import HomeHero from "../organisms/HomeHero";
import CardsContainer from "../organisms/CardsContainer";
import SubHeaderWithLink from "../molecules/SubheaderWithLink";
import { Box, Grid } from "@mui/material";
import theme from "../theme/theme";

// recipes => [[ { } ], [], []] array of an array of recipe
const categories = ["breakfast", "lunch/dinner", "snacks", "desserts"];
const HomepageTemplate = ({ recipes, searchValue, handleSearchChange, handleNavigate }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				p: 2,
			}}>
			<Grid
				container
				spacing={2}
				sx={{
					maxWidth: theme.maxWidth,
				}}>
				<Grid
					item
					xs={12}>
					<Box
						sx={{
							py: 4,
						}}>
						<HomeHero handleNavigate={handleNavigate} searchValue={searchValue} handleSearchChange={handleSearchChange}/>
					</Box>
				</Grid>
				{categories.map((category, i) => (
					<Grid
						item
						key={i}
						xs={12}>
                        <Box sx={{
                            pb: 1
                        }}>
						<SubHeaderWithLink
							title={category}
							link={`/recipes?category=${category}`}
						/>
						{recipes[category] && <CardsContainer data={recipes[category]} />}

                        </Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default HomepageTemplate;
