import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useContext } from "react";
import loginContext from "../../store/loginContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FooterComponent = () => {
  const { login } = useContext(loginContext);
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate(ROUTES.ABOUTUS);
  };

  const handleMyCardsClick = () => {
    navigate(ROUTES.MYCARDS);
  };
  const handleFavoriteClick = () => {
    navigate(ROUTES.FAVORITECARD);
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case "about":
        handleAboutClick();
        break;
      case "favorites":
        handleFavoriteClick();
        break;
      case "mycards":
        handleMyCardsClick();
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ width: "100%", position: "fixed", mt: 2, bottom: 0 }}
    >
      <BottomNavigation showLabels onChange={handleChange}>
        <BottomNavigationAction
          value="about"
          label="About"
          icon={<InfoIcon />}
        />
        {login && (
          <BottomNavigationAction
            value="favorites"
            label="Favorites"
            icon={<FavoriteIcon />}
          />
        )}
        {login && (login.isBusiness || login.isAdmin) && (
          <BottomNavigationAction
            value="mycards"
            label="My Cards"
            icon={<AssignmentIndIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default FooterComponent;
