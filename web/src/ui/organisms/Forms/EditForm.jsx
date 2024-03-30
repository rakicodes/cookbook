import TextInput from "../../atoms/Input/TextInput";
import List from "../../atoms/List/List";
import Typography from "../../atoms/Typography";
import IconButton from "../../atoms/Buttons/IconButton";
import Button from "../../atoms/Buttons/Button";
import FileInput from "../../atoms/Input/FileInput";
import Select from "../../atoms/Input/Select";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";

const EditForm = ({
	title,
	ingredients,
	ingredient,
	steps,
	step,
	options,
	category,
	handleSubmit,
	handleDeleteIngredient,
	handleAddIngredient,
	handleDeleteStep,
	handleAddStep,
	handleImage,
	handleCategory,
}) => {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					spacing={1}>
					<Grid
						item
						xs={12}>
						<TextInput
							placeholder={title.placeholder}
							onChange={title.onChange}
							fullWidth="100%"
                            value={title.value}
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<Typography
							variant="h4"
							text="Ingredients"
						/>
					</Grid>
					<Grid
						container
						item
						xs={12}>
						<Grid
							item
							xs={12}>
							<List
								list={ingredients}
								handleAction={handleDeleteIngredient}
								view={false}
								minHeight={200}
							/>
						</Grid>
						<Grid
							container
							item
							xs={12}
							sx={{
								alignItems: "center",
							}}>
							<Grid
								item
								xs={11}>
								<TextInput
									value={ingredient.value}
									placeholder={ingredient.placeholder}
									onChange={ingredient.onChange}
									view={false}
									fullWidth="100%"
								/>
							</Grid>
							<Grid
								container
								item
								xs={1}
								sx={{
									justifyContent: "center",
								}}>
								<IconButton
									icon={<AddIcon />}
									handleAction={handleAddIngredient}
									name="add ingredient"
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}>
						<Typography
							variant="h4"
							text="Instructions"
						/>
					</Grid>
					<Grid
						container
						item
						xs={12}>
						<Grid
							item
							xs={12}>
							<List
								list={steps}
								handleAction={handleDeleteStep}
								minHeight={200}
							/>
						</Grid>
						<Grid
							container
							item
							xs={12}
							sx={{
								alignItems: "center",
							}}>
							<Grid
								item
								xs={11}>
								<TextInput
									value={step.value}
									placeholder={step.placeholder}
									onChange={step.onChange}
									fullWidth="100%"
								/>
							</Grid>
							<Grid
								container
								item
								xs={1}
								sx={{
									justifyContent: "center",
								}}>
								<IconButton
									icon={<AddIcon />}
									handleAction={handleAddStep}
									name="add step"
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						container
						item
						spacing={1}
						xs={12}>
						<Grid
							item
							xs={6}>
							<FileInput
								handleAction={handleImage}
								fullWidth="100%"
							/>
						</Grid>
						<Grid
							item
							xs={6}>
							<Select
								options={options}
								handleAction={handleCategory}
								value={category}
								fullWidth="100%"
							/>
						</Grid>
					</Grid>
					<Grid
						container
						item
						xs={12}>
						<Grid
							item
							xs={12}>
							<Button
								type="submit"
								variant="contained"
								text="Save changes"
								fullWidth="100%"
							/>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</>
	);
};
export default EditForm