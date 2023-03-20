import { API_PREFIX } from "../../constants/api";
import { findLabel, findPage } from "../../utils/categoryUtils";

export async function getAllCategoriesIds(
  setSnackbarMessage,
  setCategoriesIds
) {
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
      setCategoriesIds(
        data.data.map((value) => {
          return {
            id: value.id,
            label: value.label,
            page: value.page,
          };
        })
      );
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

export async function getAllSubcategories(setSnackbarMessage, setData) {
  return fetch(`${API_PREFIX}/card/subcategory`, {
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

export async function addSubcategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenAddDialog,
  categoriesIds
) {
  return fetch(`${API_PREFIX}/card/subcategory`, {
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
          ...data.data,
          parentCategoryLabel: findLabel(
            data.data.parentCategoryId,
            categoriesIds
          ),
          parentCategoryPage: findPage(
            data.data.parentCategoryId,
            categoriesIds
          ),
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

export async function updateSubcategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenEditDialog
) {
  return fetch(`${API_PREFIX}/card/subcategory`, {
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
              ...data.data,
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

export async function deleteSubcategory(
  payload,
  setSnackbarMessage,
  setData,
  setOpenDeleteConfirmDialog
) {
  return fetch(`${API_PREFIX}/card/subcategory`, {
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
