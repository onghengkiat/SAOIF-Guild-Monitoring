import React, { useState } from "react";
import useToken from "../../hooks/useToken";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import GlobalStyles from './GlobalStyles';
import createMuiTheme from './Theme';
import { ThemeProvider } from '@mui/material/styles';

import AuthRoute from "./AuthRoute";

import NotificationPopup from './NotificationPopup';
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "../Navbar/Navbar";

import Login from "../Login/Login";
import User from "../User/User";
import CardCount from "../CardCount/CardCount";
import CardCategory from "../CardCategory/CardCategory";
import CardSubcategory from "../CardSubcategory/CardSubcategory";
import UserProfile from "../UserProfile/UserProfile";

function App() {
  const theme = createMuiTheme();
  const { token, setToken } = useToken();

  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/card/count",
      element: <AuthRoute token={ token } rolesAllowed={["ADMIN", "USER"]}>
                <Navbar activePage="卡牌統計" token={token} setToken={setToken} setSnackbarMessage={setSnackbarMessage}>
                  <CardCount setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>
                </Navbar>
              </AuthRoute>
    },
    {
      path: "/card/category",
      element: <AuthRoute token={ token } rolesAllowed={["ADMIN"]}>
                <Navbar activePage="卡牌類別" token={token} setToken={setToken} setSnackbarMessage={setSnackbarMessage}>
                  <CardCategory setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>
                </Navbar>
              </AuthRoute>
    },
    {
      path: "/card/subcategory",
      element: <AuthRoute token={ token } rolesAllowed={["ADMIN"]}>
                <Navbar activePage="卡牌副類別" token={token} setToken={setToken} setSnackbarMessage={setSnackbarMessage}>
                  <CardSubcategory setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>
                </Navbar>
              </AuthRoute>
    },
    {
      path: "/user",
      element: <AuthRoute token={ token } rolesAllowed={["ADMIN"]}>
                <Navbar activePage="用戶" token={token} setToken={setToken} setSnackbarMessage={setSnackbarMessage}>
                  <User setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>
                </Navbar>
              </AuthRoute>
    },
    {
      path: "/profile",
      element: <AuthRoute token={ token } rolesAllowed={["ADMIN", "USER"]}>
                <Navbar activePage="個人資料" token={token} setToken={setToken} setSnackbarMessage={setSnackbarMessage}>
                  <UserProfile setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>,
                </Navbar>
              </AuthRoute>
    },
    {
      path: "/login",
      element: <Login setToken={setToken} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>,
    },
    {
      path: "*",
      element: <Login setToken={setToken} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>,
    }
  ]);
  return (
    <ThemeProvider theme={theme}><User setSnackbarMessage={setSnackbarMessage} setLoading={setLoading}/>
      <GlobalStyles />
      <NotificationPopup setSnackbarMessage={setSnackbarMessage} snackbarMessage={snackbarMessage} />
      <LoadingSpinner loading={loading}/>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
