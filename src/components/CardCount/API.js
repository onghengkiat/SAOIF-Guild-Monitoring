import { API_PREFIX } from "../../constants/api";

export async function getAllCategoriesAndSubcategories(
  setSnackbarMessage,
  setCategoriesAndSubcategories,
  page
) {
  return fetch(`${API_PREFIX}/card/subcategory/page/${page}`, {
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
      setCategoriesAndSubcategories(data.data);
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

export async function getAllCardCounts(setSnackbarMessage, setData, page) {
  return fetch(`${API_PREFIX}/card/count/page/${page}`, {
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
          return value.subcategoryCardCountResponses?.reduce(
            (acc, curr) => {
              const { id, count } = curr;
              return Object.assign(acc, { [id]: count });
            },
            { id: value.id, name: value.name }
          );
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

export async function updateCardCounts(
  userId,
  payload,
  setSnackbarMessage,
  setData,
  setOpenEditDialog
) {
  return fetch(`${API_PREFIX}/card/count`, {
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
      setData((rows) =>
        rows.map((row) => {
          if (row.id !== userId) {
            return row;
          } else {
            const newRowData = {};

            data.data.forEach((obj) => {
              obj.subcategoryCardCountResponses?.forEach(
                (subcategoryCardCountResponse) => {
                  newRowData[subcategoryCardCountResponse.id] =
                    subcategoryCardCountResponse.count;
                }
              );
            });

            return {
              ...row,
              ...newRowData,
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
