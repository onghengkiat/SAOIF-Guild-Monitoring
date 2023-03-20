import { API_PREFIX } from "../../constants/api";

export async function getAllCategories(setSnackbarMessage, setData) {
  return fetch(`${API_PREFIX}/card/category`, {
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

export async function addCategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenAddDialog
) {
  return fetch(`${API_PREFIX}/card/category`, {
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

export async function updateCategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenEditDialog
) {
  return fetch(`${API_PREFIX}/card/category`, {
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

export async function deleteCategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenDeleteConfirmDialog
) {
  return fetch(`${API_PREFIX}/card/category`, {
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
