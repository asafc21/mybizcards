import { useContext } from "react";
import loginContext from "../store/loginContext";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AdminGuard = ({ children }) => {
  const { login } = useContext(loginContext);
  if (login && login.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default AdminGuard;
