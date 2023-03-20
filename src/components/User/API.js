import { API_PREFIX } from "../../constants/api";

export async function getAllUsers(setSnackbarMessage, setData) {
  return fetch(`${API_PREFIX}/user`, {
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
      setData(
        data.data.map((value) => {
          return {
            ...value,
            id: value["id"],
          };
        })
      );
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

export async function addUser(
  payload,
  setSnackbarMessage,
  setData,
  setOpenAddDialog
) {
  return fetch(`${API_PREFIX}/user`, {
    method: "POST",
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
      setData((oldRows) => [
        ...oldRows,
        {
          ...payload,
          id: data.data["id"],
          role: payload["roles"][0]["name"],
        },
      ]);
      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });
      setOpenAddDialog(false);
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

export async function updateUser(
  payload,
  setSnackbarMessage,
  setData,
  setOpenEditDialog
) {
  return fetch(`${API_PREFIX}/user`, {
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
      setData((rows) =>
        rows.map((row) => {
          if (row.id !== payload.id) {
            return row;
          } else {
            return {
              ...row,
              ...payload,
              role: payload["roles"][0]["name"],
            };
          }
        })
      );

      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });

      setOpenEditDialog(false);
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

export async function deleteUser(
  payload,
  setSnackbarMessage,
  setData,
  setOpenDeleteConfirmDialog
) {
  return fetch(`${API_PREFIX}/user`, {
    method: "DELETE",
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
      setData((rows) => rows.filter((row) => row.id !== payload.id));

      setSnackbarMessage({
        severity: "success",
        message: data.message,
      });

      setOpenDeleteConfirmDialog(false);
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
