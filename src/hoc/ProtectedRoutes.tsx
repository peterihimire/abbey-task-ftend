import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoutes;
