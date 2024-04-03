import { Grid, Box } from "@mui/material";

const DrawerList = ({ items }) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        {items.map((item, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            {item}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DrawerList;
