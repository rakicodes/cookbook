import TextInput from "../../atoms/Input/TextInput";
import Button from "../../atoms/Buttons/Button";
import { Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = ({ email, password, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              name={email.name}
              value={email.value}
              placeholder={email.placeholder}
              onChange={email.onChange}
              fullWidth="100%"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name={password.name}
              value={password.value}
              placeholder={password.placeholder}
              onChange={password.onChange}
              fullWidth="100%"
              type="password"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              Don't have an account?
              <Link component={RouterLink} to="/signup" color="secondary">
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            pt: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            text="Log in"
            fullWidth="100%"
          />
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
