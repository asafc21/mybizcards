import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Switch, Button } from "@mui/material";
import Links from "./ui/Links";
import { useState } from "react";
import FilterComponent from "./ui/FilterComponent";
import { useLocation } from "react-router-dom";
import loginContext from "../../store/loginContext";
import { useContext } from "react";
import { useNavigateSwitch } from "../../hooks/useNavigateSwitch.js";
import MenuItemMobileComponent from "./ui/MenuItemMobileComponent.jsx";
import ROUTES from "../../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";
const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const location = useLocation();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { login, setLogin } = useContext(loginContext);
  const navigateSwitch = useNavigateSwitch();
  const navigate = useNavigate();

  const checkIfSearchNeeded = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/my-cards" ||
      location.pathname === "/favorites" ||
      location.pathname === "/crm"
    )
      return true;
    return false;
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigateSwitch(e.target.id);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("remember_me");
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setLogin(false);
    navigate(ROUTES.LOGIN);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem id="profile-page-lg" onClick={handleMenuClose}>
        Edit Profile
      </MenuItem>
      {login && (
        <MenuItem>
          <Button variant="contained" color="error" onClick={handleLogout}>
            LOGOUT
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItemMobileComponent onClick={handleMenuClose} />
      {login && (
        <MenuItem>
          <Button variant="contained" color="error" onClick={handleLogout}>
            LOGOUT
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {" "}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BizCards
          </Typography>
          <Links />
          <Box sx={{ flex: 1 }} />{" "}
          {checkIfSearchNeeded() && <FilterComponent />}{" "}
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          {login && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
export default HeaderComponent;
