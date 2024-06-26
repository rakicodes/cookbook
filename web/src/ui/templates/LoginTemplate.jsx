import { Box, Grid } from "@mui/material";
import LoginForm from "../organisms/Forms/LoginForm";
import theme from "../theme/theme";
import Typography from "../atoms/Typography";

const LoginTemplate = ({ email, password, handleSubmit }) => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: theme.maxWidth,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            pb: 2,
          }}
        >
          <Typography variant="h2" text="Log in" />
        </Grid>
        <Grid item xs={12}>
          <LoginForm
            email={email}
            password={password}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginTemplate;
