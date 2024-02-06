import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AboutUsPage from "../pages/AboutUsPage";
import NotFoundPage from "../pages/404Page";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import CreateCardPage from "../pages/CreateCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import ViewCardPage from "../pages/ViewCardPage";
import FavoriteCardsPage from "../pages/FavoriteCardsPage";
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUTUS} element={<AboutUsPage />} />
      <Route path={ROUTES.FAVORITECARD} element={<FavoriteCardsPage />} />
      <Route path={`${ROUTES.VIEWCARD}/:id`} element={<ViewCardPage />} />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <BizGuard>
            <MyCardsPage />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.EDIT_USER}
        element={
          <AuthGuard>
            <EditProfilePage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
