import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ text, variant, align }) => {
  return (
    <>
        <MuiTypography variant={variant} align={align}>{text}</MuiTypography>
    </>
  )
}

export default Typography