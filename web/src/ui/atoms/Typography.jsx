import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ text, variant, align, noWrap = false }) => {
  return (
    <>
      <MuiTypography noWrap={noWrap} variant={variant} align={align}>
        {text}
      </MuiTypography>
    </>
  );
};

export default Typography;
