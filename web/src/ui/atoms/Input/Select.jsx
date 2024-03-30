import { FormControl, MenuItem, Select as MuiSelect } from "@mui/material";

const Select = ({ options, handleAction, value, fullWidth }) => {
	return (
		<>
			<FormControl sx={{ width: fullWidth, textAlign: "center" }}>
				<MuiSelect
					onChange={handleAction}
					value={value}>
					{options.map((option, i) => (
						<MenuItem
							key={i}
							value={option}>
							{option}
						</MenuItem>
					))}
				</MuiSelect>
			</FormControl>
		</>
	);
};

export default Select;
