import { API_PREFIX } from "../../constants/api";

export async function getUserProfile(setSnackbarMessage, setData) {
  return fetch(`${API_PREFIX}/user/profile`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    })
    .then((data) => {
      setData(data.data);
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
        message: "Something went wrong in communicating the server!",
      });
    });
}

export async function updateUserProfile(
  payload,
  setSnackbarMessage,
  setData,
  setEditing
) {
  return fetch(`${API_PREFIX}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    })
    .then((data) => {
      setData((data) => {
        return { ...data, ...payload };
      });
      setSnackbarMessage({
        severity: "success",
        message: "Your profile has been edited successfully!",
      });
      setEditing(false);
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
        message: "Something went wrong in communicating the server!",
      });
    });
}

export async function changePassword(
  payload,
  setSnackbarMessage,
  setChangingPassword
) {
  return fetch(`${API_PREFIX}/user/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw response;
    })
    .then((data) => {
      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });
      setChangingPassword(false);
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
        message: "Something went wrong in communicating the server!",
      });
    });
}
