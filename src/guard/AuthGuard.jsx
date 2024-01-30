import { useContext } from "react";
import loginContext from "../store/loginContext";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AuthGuard = ({ children }) => {
  const { login } = useContext(loginContext);
  if (login) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default AuthGuard;
