import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

export const useNavigateSwitch = () => {
  const navigate = useNavigate();

  const navigateSwitch = (id) => {
    switch (id) {
      case "profile-page":
      case "profile-page-lg":
        navigate(ROUTES.EDIT_USER);
        break;
      case "aboutus-page":
        navigate(ROUTES.ABOUTUS);
        break;
      case "favorite-page":
        navigate(ROUTES.FAVORITECARD);
        break;
      case "home-page":
        navigate(ROUTES.HOME);
        break;
      case "mycards-page":
        navigate(ROUTES.MYCARDS);
        break;
      case "login-page":
        navigate(ROUTES.LOGIN);
        break;
      case "register-page":
        navigate(ROUTES.REGISTER);
        break;
      case "crm-page":
        navigate(ROUTES.CRM);
        break;
      default:
        break;
    }
  };

  return navigateSwitch;
};
