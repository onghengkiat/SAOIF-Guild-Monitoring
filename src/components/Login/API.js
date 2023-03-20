import { API_PREFIX } from "../../constants/api";

export async function loginUser(credentials, setSnackbarMessage, setToken) {
  return fetch(`${API_PREFIX}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    })
    .then((data) => {
      setToken({
        isLoggedIn: true,
        role: data.data.role,
        username: data.data.username,
      });
      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });
    })
    .catch((error) => {
      error.json().then((response) => {
        setSnackbarMessage({
          severity: "error",
          message: response.message,
        });
      });
    })
    .catch((error) => {
      setSnackbarMessage({
        severity: "error",
        message: "伺服器有問題，請通知管理員",
      });
    });
}

export async function logoutUser(setSnackbarMessage, setToken) {
  return fetch(`${API_PREFIX}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    })
    .then((data) => {
      sessionStorage.clear();
      setToken({
        isLoggedIn: false,
        role: "",
        username: "",
      });
      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });
    })
    .catch((error) => {
      error.json().then((response) => {
        setSnackbarMessage({
          severity: "error",
          message: response.message,
        });
      });
    })
    .catch((error) => {
      setSnackbarMessage({
        severity: "error",
        message: "Something went wrong when logging out!",
      });
    });
}
