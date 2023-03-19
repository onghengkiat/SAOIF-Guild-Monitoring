import React from "react";
import { Navigate } from "react-router";

import { hasAccess } from "../../utils/roleUtils";

export default function AuthRoute({
  rolesAllowed,
  fallbackPath = "/login",
  children,
  token,
}) {
  if (!token) {
    return <Navigate to={fallbackPath} replace />;
  }

  const { isLoggedIn, role } = token;

  if (!isLoggedIn) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (hasAccess(role, rolesAllowed)) {
    return children;
  } else {
    return <Navigate to={fallbackPath} replace />;
  }
}
