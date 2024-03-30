import Typography from "../atoms/Typography";
import AddForm from "../organisms/Forms/AddForm";
import theme from "../theme/theme";
import { Box, Grid } from "@mui/material";

const AddRecipeTemplate = ({
	title,
	ingredients,
	ingredient,
	handleAddIngredient,
	handleDeleteIngredient,
	steps,
	step,
	handleAddStep,
	handleDeleteStep,
	handleImage,
	options,
	category,
	handleCategory,
	handleSubmit,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center"
			}}
		>
			<Grid
				container
				spacing={1}
				sx={{
					maxWidth: theme.maxWidth
				}}
				>
				<Grid
					item
					xs={12}>
					<Typography
						variant="h1"
						text="Add a recipe"
						align="center"
					/>
				</Grid>
				<Grid
					item
					xs={12}>
					<AddForm
						title={title}
						ingredients={ingredients}
						ingredient={ingredient}
						steps={steps}
						step={step}
						options={options}
						category={category}
						handleAddIngredient={handleAddIngredient}
						handleDeleteIngredient={handleDeleteIngredient}
						handleAddStep={handleAddStep}
						handleDeleteStep={handleDeleteStep}
						handleImage={handleImage}
						handleCategory={handleCategory}
						handleSubmit={handleSubmit}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddRecipeTemplate;
