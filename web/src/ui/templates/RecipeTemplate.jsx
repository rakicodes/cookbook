import IconButton from "../atoms/Buttons/IconButton";
import Typography from "../atoms/Typography";
import { Box, Grid } from "@mui/material";
import List from "../atoms/List/List";
import Chip from "../atoms/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../theme/theme";

const RecipeTemplate = ({
	name,
	imageUrl,
	ingredients,
	steps,
	category,
	handleEdit,
	handleDelete,
	isUserRecipe,
}) => {
	return (
		<Box sx={{
			display: "flex",
			justifyContent: "center",
			px: 2,
			py: 4
		}}>
			<Grid
				container
				spacing={2}
				sx={{
					maxWidth: theme.maxWidth
				}}>
				<Grid
					item
					xs={12}>
					<Grid
						item
						xs={12}>
						<img
							src={imageUrl}
							alt={name}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<Typography
							variant="h1"
							text={name}
						/>
					</Grid>
					<Grid
						container
						item
						xs={12}
						sx={{
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Grid
							item
							xs={4}>
							<Chip
								text={category}
								variant="outlined"
							/>
						</Grid>
						{isUserRecipe && (
							<Grid
								container
								item
								xs={6}
								sx={{
									justifyContent: "end",
								}}>
								<Grid item>
									<IconButton
										icon={<EditIcon />}
										handleAction={handleEdit}
										name="edit recipe"
									/>
								</Grid>
								<Grid item>
									<IconButton
										icon={<DeleteIcon />}
										handleAction={handleDelete}
										name="delete recipe"
									/>
								</Grid>
							</Grid>
						)}
					</Grid>
					<Grid
						item
						xs={12}>
						<Typography
							variant="h3"
							text="Ingredients"
						/>
						<List
							list={ingredients}
							view={true}
							isOrdered={false}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<Typography
							variant="h3"
							text="Instructions"
						/>
						<List
							list={steps}
							view={true}
							isOrdered={true}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RecipeTemplate;
