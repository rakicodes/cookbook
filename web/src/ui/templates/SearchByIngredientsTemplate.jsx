import { Grid, Box } from "@mui/material";
import SearchForm from "../molecules/SearchForm";
import CardsContainer from "../organisms/CardsContainer";
import theme from "../theme/theme";
import Typography from "../atoms/Typography";

const SearchByIngredientsTemplate = ({
  recipes,
  searchValue,
  handleSearchChange,
  isSearch,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: theme.maxWidth,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h1" text="Search by Ingredients" />
          <Typography
            variant="body1"
            text="Don't know what to cook? Want to use up some of items in your fridge? Search up an ingredient or ingredients (use commas to separate the ingredients). Let's see what we can find!"
          />
        </Grid>
        <Grid item xs={12}>
          <SearchForm
            name="ingredients"
            value={searchValue}
            handleChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ pt: 1 }}>
            <CardsContainer
              data={recipes}
              message={isSearch ? `Sorry no recipe found!` : ""}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchByIngredientsTemplate;
