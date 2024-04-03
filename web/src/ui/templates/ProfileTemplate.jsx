import { Grid, Box } from "@mui/material";
import Typography from "../atoms/Typography";
import Button from "../atoms/Buttons/Button";
import CardsContainer from "../organisms/CardsContainer";
import theme from "../theme/theme";
const ProfileTemplate = ({ name, recipes, handleNavigate, isUserProfile }) => {
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
        {name && (
          <Grid item xs={12}>
            <Typography variant="h2" text={isUserProfile && `Hi ${name}!`} />
          </Grid>
        )}
        <Grid item xs={12}>
          {isUserProfile && (
            <Button
              text="Add recipe"
              fullWidth="100%"
              variant="outlined"
              action={handleNavigate}
            />
          )}
        </Grid>
        {name && (
          <Grid item xs={12}>
            <Typography
              variant="h3"
              text={isUserProfile ? "Your recipes" : `${name} recipes`}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <CardsContainer data={recipes} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileTemplate;
