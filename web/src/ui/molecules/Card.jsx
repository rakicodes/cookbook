import { Link as RouterLink } from "react-router-dom";
import Typography from "../atoms/Typography";
import {
	CardActions,
	CardContent,
	CardMedia,
	Card as MuiCard,
	Link
} from "@mui/material";

const Card = ({ image, name, id, ingredients }) => {
	return (
		<MuiCard
			variant="outlined"
			sx={{
				height: 400,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%"
			}}>
			<CardMedia
				image={image}
				title={name}
				sx={{ height: 240 }}
			/>
			<CardContent sx={{ width: "100% "}}>
				<Typography
					variant="h6"
					text={name}
					noWrap={true}
				/>
				<Typography
					variant="body1"
					text={ingredients.join(", ")}
					noWrap={true}
				/>
			</CardContent>
			<CardActions sx={{ alignSelf: "end" }}>
				<Link component={RouterLink} underline="hover" to={`/recipe/${id}`} color="secondary">view recipe</Link>
			</CardActions>
		</MuiCard>
	);
};

export default Card;
