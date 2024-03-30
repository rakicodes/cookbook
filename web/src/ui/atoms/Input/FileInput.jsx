import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "../Typography";


const FileInput = ({ handleAction, fullWidth }) => {
	return (
		<>
			<Button
				component="label"
				role={undefined}
				variant="contained"
				startIcon={<CloudUploadIcon />}
				tabIndex={-1}
				color="secondary"
				sx={{
					height: "100%",
					width: fullWidth
				}}
			>
			<Typography variant="button" text="Choose Image" />
			<TextField
				type="file"
				name="image"
				onChange={handleAction}
				sx={{
					display: 'none',
				}}
			/>
			</Button>
		</>
	);
};

export default FileInput;
