import IconButton from "../atoms/Buttons/IconButton";
import { useContext, useState } from "react";
import { ThemeModeContext } from "../App";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Drawer, Grid, Link } from "@mui/material";
import Button from "../atoms/Buttons/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "../molecules/Drawer/DrawerList";
import DrawerItem from "../molecules/Drawer/DrawerItem";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
	const { toggleThemeMode, mode } = useContext(ThemeModeContext);
	const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const dispatch = useDispatch();

	const { data, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const toggleMenu = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
	const handleNavigate = (url) => {
		navigate(url);
	};

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};

	return (
		<>
			<Grid
				container
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					px: 2,
					pt: 2,
				}}>
				<Grid
					container
					item
					spacing={2}
					xs={6}
					sx={{
						alignItems: "center",
					}}>
					<Grid item>
						<Link
							component={RouterLink}
							underline="none"
							to="/"
							color="secondary">
							<MenuBookIcon />
						</Link>
					</Grid>
					<Grid item>
						<Link
							component={RouterLink}
							underline="hover"
							to="/recipes"
							color="secondary">
							Recipes
						</Link>
					</Grid>
					<Grid
						item
						sx={{
							display: { xs: "none", md: "block" },
						}}>
						<Link
							component={RouterLink}
							underline="hover"
							to="/searchByIngredients"
							color="secondary">
							Search by Ingredients
						</Link>
					</Grid>
				</Grid>
				<Grid
					container
					item
					xs={6}
					sx={{
						justifyContent: "end",
					}}>
					<Grid
						container
						item
						gap={1}
						sx={{
							justifyContent: "end",
						}}>
						<Grid
							item
							xs={2}
							sm={1}>
							<IconButton
								icon={mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
								handleAction={toggleThemeMode}
							/>
						</Grid>

						<Grid
							container
							item
							spacing={1}
							xs={6}
							sx={{
								display: { xs: "none", md: "flex" },
							}}>
							{data ? (
								<>
									<Grid
										item
										xs={6}>
										<Button
											variant="contained"
											text={`${data.name}`}
											color="secondary"
											sx={{
												width: "100%",
												height: "100%",
												flexGrow: 1,
											}}
											action={() => handleNavigate(`/profile/${data._id}`)}
										/>
									</Grid>
									<Grid
										item
										xs={6}>
										<Button
											variant="outlined"
											text="Log out"
											color="secondary"
											sx={{
												width: "100%",
												height: "100%",
												flexGrow: 1,
											}}
											action={handleLogout}
										/>
									</Grid>
								</>
							) : (
								<>
									<Grid
										item
										xs={6}>
										<Button
											variant="outlined"
											text="Sign up"
											color="secondary"
											sx={{
												width: "100%",
												height: "100%",
												flexGrow: 1,
											}}
											action={() => handleNavigate("/signup")}
										/>
									</Grid>
									<Grid
										item
										xs={6}>
										<Button
											variant="contained"
											text="Log in"
											color="secondary"
											sx={{
												width: "100%",
												height: "100%",
												flexGrow: 1,
											}}
											action={() => handleNavigate("/login")}
										/>
									</Grid>
								</>
							)}
						</Grid>

						<Grid
							item
							xs={2}
							sm={1}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							<IconButton
								icon={<MenuIcon />}
								handleAction={toggleMenu}
							/>
						</Grid>
					</Grid>

					<Drawer
						open={isDrawerOpen}
						onClose={toggleMenu}
						PaperProps={{
							sx: {
								justifyContent: "center",
							},
						}}>
						<DrawerList
							items={
								data
									? [
											<DrawerItem
												text="Search By Ingredients"
												link="/searchByIngredients"
											/>,
											<DrawerItem
												text="Add recipe"
												link="/addrecipe"
											/>,
											<DrawerItem
												text={`${data.name}`}
												link={`/profile/${data._id}`}
											/>,
											<DrawerItem
												text="Log out"
												link="/"
												action={() => dispatch(logout())}
											/>,
									  ]
									: [
											<DrawerItem
												text="Search By Ingredients"
												link="/searchByIngredients"
											/>,
											<DrawerItem
												text="Log in"
												link="/login"
											/>,
											<DrawerItem
												text="Sign up"
												link="/signup"
											/>,
									  ]
							}
						/>
					</Drawer>
				</Grid>
			</Grid>
		</>
	);
};

export default Header;
