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
        message: data.message,
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
        message: "伺服器有問題，請通知管理員",
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
        message: "伺服器有問題，請通知管理員",
      });
    });
}
