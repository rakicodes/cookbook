import { Chip as MuiChip } from "@mui/material";
const Chip = ({ text, variant }) => {
  return <MuiChip variant={variant} label={text} />;
};

export default Chip;
