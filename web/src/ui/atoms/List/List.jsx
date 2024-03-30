import { List as MuiList } from "@mui/material";
import ListItemWithIcon from "./ListItemWithIcon";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from 'uuid';

const List = ({ list, handleAction, view, isOrdered, minHeight }) => {
	return (
		<>
			<MuiList sx={{
				minHeight: minHeight
			}}>
				{list.map((item, i) =>
					view ? (
						<ListItem
							key={uuidv4()}
							text={item}
							isOrdered={isOrdered}
							index={i+1}
						/>
					) : (
						<ListItemWithIcon
							key={i}
							text={item}
							handleAction={handleAction}
						/>
					)
				)}
			</MuiList>
		</>
	);
};

export default List;
