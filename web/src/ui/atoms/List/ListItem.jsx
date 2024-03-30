import { ListItemText, ListItem as MuiListItem } from "@mui/material";

const ListItem = ({ text, component, isOrdered, index }) => {
	return (
		<MuiListItem component={component}>
			<ListItemText>
				{`${isOrdered ? `${index}.` : "-"} ${text}`}
			</ListItemText>
		</MuiListItem>
	);
};

export default ListItem;
