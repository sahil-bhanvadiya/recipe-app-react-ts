import { FC } from "react";
import { Navigate } from "react-router-dom";

const AuthGaurd:FC<{children:JSX.Element}> = ({children}) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default AuthGaurd;
