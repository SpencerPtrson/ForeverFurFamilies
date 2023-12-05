import { useLocation, Outlet, Navigate } from "react-router-dom";
import store from "../store";
import { useSelector } from "react-redux";

export const PrivateRoutes = () => {
  const isAuth = useSelector((state) => state.isAuth);
  
  const location = useLocation();

  if (isAuth === undefined) {
    return null; 
  }

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
