import { Box } from "@mui/material";
import Button from "../atoms/Buttons/Button";
import TextInput from "../atoms/Input/TextInput";

const SearchForm = ({ name="search", value, handleChange, handleAction }) => {
	return (
		<Box
			sx={{
				display: "flex",
				pt: 1
			}}
		>
			<form
				name={name}
				style={{
					width: "100%",
					display: "flex",
					gap: "8px"
				}}>
				<TextInput
					name={name}
					placeholder="Search for a recipe..."
					variant="outlined"
					value={value}
					onChange={handleChange}
					fullWidth
					sx={{
						flexGrow: 1
					}}
				/>
				<Button
					type={handleAction ? "button" : "submit"}
					name={name}
					variant="contained"
					color="secondary"
					text="Search"
					sx={{
						height: "100%",
					}}
					action={ handleAction && (() => handleAction(`/recipes?search=${value}`))}
				/>
			</form>
		</Box>
	);
};

export default SearchForm;
