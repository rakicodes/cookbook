import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ListItemWithIcon = ({ text, handleAction, icon }) => {
  return (
    <ListItem>
      <Grid container>
        <Grid item xs>
          <ListItemText>{text}</ListItemText>
        </Grid>
        <Grid item xs={1}>
          <ListItemButton
            sx={{ justifyContent: "center" }}
            onClick={() => handleAction(text)}
          >
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <DeleteIcon />
            </ListItemIcon>
          </ListItemButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ListItemWithIcon;
