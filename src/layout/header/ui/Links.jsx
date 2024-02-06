import { Box } from "@mui/material";
import {
  adminLinks,
  alwaysLinks,
  bizLinks,
  loggedInLinks,
  loggedOutLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useContext } from "react";
import loginContext from "../../../store/loginContext";

const Links = () => {
  const { login } = useContext(loginContext);
  const loggedIn = login;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem, index) => (
        <NavLinkComponent to={myItem.to} key={"linksnav" + index}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav3" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedIn.isAdmin &&
        adminLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav4" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav5" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
