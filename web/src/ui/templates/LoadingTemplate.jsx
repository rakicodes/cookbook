import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default LoadingTemplate;
