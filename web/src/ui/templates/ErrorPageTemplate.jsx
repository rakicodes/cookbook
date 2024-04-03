import { Grid } from "@mui/material";
import Typography from "../atoms/Typography";
import Header from "../organisms/Header";

const ErrorPageTemplate = ({ message }) => {
  return (
    <Grid container sx={{ minHeight: "100vh", alignItems: "baseline" }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          justifyContent: "center",
        }}
      >
        <Typography text={message} variant="body1" />
      </Grid>
    </Grid>
  );
};

export default ErrorPageTemplate;
