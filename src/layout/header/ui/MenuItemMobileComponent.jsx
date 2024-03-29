import { Box, MenuItem } from "@mui/material";
import { useContext } from "react";
import loginContext from "../../../store/loginContext.js";
import PropTypes from "prop-types";

const MenuItemMobileComponent = ({ onClick }) => {
  const { login } = useContext(loginContext);
  const alwaysLinksMobile = [
    { id: "home-page", children: "Home Page" },
    { id: "aboutus-page", children: "About Us" },
  ];
  const loggedInLinksMobile = [
    { id: "favorite-page", children: "Favorites" },
    { id: "profile-page", children: "Edit Profile" },
  ];

  const loggedInBusinessLinksMobile = [
    { id: "mycards-page", children: "My Cards" },
  ];

  const loggedInAdminLinksMobile = [{ id: "crm-page", children: "CRM" }];

  const loggedOutLinksMobile = [
    { id: "register-page", children: "Register" },
    { id: "login-page", children: "LOGIN" },
  ];

  return (
    <Box>
      {alwaysLinksMobile.map((item, index) => (
        <MenuItem
          sx={{ justifyContent: "center" }}
          id={item.id}
          onClick={onClick}
          key={"mobilenav1" + index}
        >
          {item.children}
        </MenuItem>
      ))}
      {login &&
        (login.isAdmin || login.isBusiness) &&
        loggedInBusinessLinksMobile.map((item, index) => (
          <MenuItem
            sx={{ justifyContent: "center" }}
            id={item.id}
            onClick={onClick}
            key={"mobilenav2" + index}
          >
            {item.children}
          </MenuItem>
        ))}
      {login &&
        loggedInLinksMobile.map((item, index) => (
          <MenuItem
            sx={{ justifyContent: "center" }}
            id={item.id}
            onClick={onClick}
            key={"mobilenav3" + index}
          >
            {item.children}
          </MenuItem>
        ))}
      {login &&
        login.isAdmin &&
        loggedInAdminLinksMobile.map((item, index) => (
          <MenuItem
            sx={{ justifyContent: "center" }}
            id={item.id}
            onClick={onClick}
            key={"mobilena4" + index}
          >
            {item.children}
          </MenuItem>
        ))}
      {!login &&
        loggedOutLinksMobile.map((item, index) => (
          <MenuItem
            sx={{ justifyContent: "center" }}
            id={item.id}
            onClick={onClick}
            key={"mobilenav5" + index}
          >
            {item.children}
          </MenuItem>
        ))}
    </Box>
  );
};

MenuItemMobileComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuItemMobileComponent;
