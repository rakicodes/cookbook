import { List } from "@mui/material";
import ListItemWithIcon from "../List/ListItemWithIcon";
import ListItem from "./ListItem";

const OrderedList = ({ list, handleAction, view }) => {
  return (
    <>
      <List>
        {list.map((item, i) =>
          view ? (
            <ListItem key={i} text={item} />
          ) : (
            <ListItemWithIcon key={i} text={item} handleAction={handleAction} />
          ),
        )}
      </List>
    </>
  );
};

export default OrderedList;
