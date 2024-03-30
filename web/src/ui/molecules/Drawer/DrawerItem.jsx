import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import Typography from "../../atoms/Typography";

const DrawerItem = ({ link, text, action }) => {
	return (
		<Link
			component={RouterLink}
			to={link}
			color="secondary"
			underline="hover"
			onClick={action}>
			<Typography
				text={text}
				variant="button"
			/>
		</Link>
	);
};

export default DrawerItem;
