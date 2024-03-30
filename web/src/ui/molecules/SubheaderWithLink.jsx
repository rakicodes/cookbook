import { Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Typography from "../atoms/Typography";

const SubheaderWithLink = ({ title, link }) => {
	return (
		<Grid
			container
			sx={{
				justifyContent: "space-between",
				alignItems: "center",
			}}>
			<Grid
				item
				xs={4}>
				<Typography
					variant="h4"
					text={title}
				/>
			</Grid>
			<Grid
				container
				item
				xs={4}
				sx={{
					justifyContent: "end",
				}}>
				<Grid
					item>
					<Link
						component={RouterLink}
						to={link}
						underline="hover"
						color="secondary">
						View more
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SubheaderWithLink;
