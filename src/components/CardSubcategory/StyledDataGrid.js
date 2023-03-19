import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  margin: "10px 40px",
  height: "calc(100% - 150px)",
  minWidth: "400px",
  minHeight: "420px",
  background:
    theme.palette.mode === "light" ? "rgba(255,255,255)" : "rgba(0,0,0)",
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    border: `1px solid ${
      theme.palette.mode === "light" ? "#e0e0e0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
}));
