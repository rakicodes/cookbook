import { Button as MuiButton } from "@mui/material";
import Typography from "../Typography";

const Button = ({
  text,
  action,
  type = "button",
  color = "secondary",
  fullWidth,
  variant,
  sx,
}) => {
  return (
    <>
      <MuiButton
        variant={variant}
        type={type}
        onClick={action}
        color={color}
        sx={{
          width: fullWidth,
          ...sx,
        }}
      >
        <Typography variant="button" text={text} />
      </MuiButton>
    </>
  );
};

export default Button;
