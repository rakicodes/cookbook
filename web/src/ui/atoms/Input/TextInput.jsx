import { TextField } from "@mui/material";

const TextInput = ({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required,
  variant,
  hidden,
  fullWidth,
  sx,
}) => {
  return (
    <>
      <TextField
        type={type}
        variant={variant}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        sx={
          hidden
            ? {
                display: "none",
              }
            : {
                width: fullWidth,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.light",
                  },
                  ...sx,
                },
              }
        }
      />
    </>
  );
};

export default TextInput;
