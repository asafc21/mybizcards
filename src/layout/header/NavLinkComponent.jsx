import { Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink style={{ textDecoration: "none" }} to={to}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{ p: 2 }}
          variant="h6"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
