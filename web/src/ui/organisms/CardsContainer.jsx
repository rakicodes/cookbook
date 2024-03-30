import Typography from "../atoms/Typography";
import Card from "../molecules/Card";
import { Box, Grid } from "@mui/material";

const CardsContainer = ({ data, message }) => {
	return (
		<Grid
			container
			spacing={2}>
			{data.length ? (
				data.map((r, i) => (
					<Grid
						key={i}
						item
						xs={12}
						sm={4}>
						<Box>
							<Card
								id={r._id}
								name={r.name}
								image={r.image}
								ingredients={r.ingredients}
							/>
						</Box>
					</Grid>
				))
			) : (
				<Grid
					item
					xs={12}>
					<Typography
						variant="body1"
						text={message}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default CardsContainer;
