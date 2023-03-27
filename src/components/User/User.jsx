import React, { useState, Fragment, useEffect } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import DetailDialog from "./DetailDialog";
import EditDialog from "./EditDialog";
import AddDialog from "./AddDialog";
import { StyledDataGrid } from "./StyledDataGrid";
import getColumns from "./DataGridColumns";

import Typography from "@mui/material/Typography";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { getAllUsers } from "./API";

export default function User({ setSnackbarMessage, setLoading }) {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      await getAllUsers(setSnackbarMessage, setData);

      setLoading(false);
    }

    fetchData();
  }, []);

  function CustomToolbar() {
    const handleAddButton = () => {
      setOpenAddDialog(true);
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            utf8WithBom: true
          }}  
          fileName="用戶列表"
        />

        <Button size="small" startIcon={<AddIcon />} onClick={handleAddButton}>
          添加新用戶
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" my={2} mx={windowWidth <= 480 ? 0 : 2} px={windowWidth <= 480 ? 0 : 3}>
        用戶列表
      </Typography>

      <DetailDialog
        setOpenDetailDialog={setOpenDetailDialog}
        openDetailDialog={openDetailDialog}
        detailDialogData={selectedData}
      />
      <AddDialog
        setOpenAddDialog={setOpenAddDialog}
        openAddDialog={openAddDialog}
        setSnackbarMessage={setSnackbarMessage}
        setLoading={setLoading}
        setData={setData}
      />
      <EditDialog
        setOpenEditDialog={setOpenEditDialog}
        openEditDialog={openEditDialog}
        setSnackbarMessage={setSnackbarMessage}
        setLoading={setLoading}
        editDialogData={selectedData}
        setData={setData}
      />
      <DeleteConfirmDialog
        setOpenDeleteConfirmDialog={setOpenDeleteConfirmDialog}
        openDeleteConfirmDialog={openDeleteConfirmDialog}
        setSnackbarMessage={setSnackbarMessage}
        setLoading={setLoading}
        deletedRow={selectedData}
        setData={setData}
      />
      <StyledDataGrid
        sx={{
          margin: windowWidth <= 480 ? "10px 0" : "10px 40px",
          padding: windowWidth <= 480 ? "10px 0" : "10px 10px"
        }}
        rows={data}
        columns={
          getColumns(
            setOpenDetailDialog,
            setOpenEditDialog,
            setOpenDeleteConfirmDialog,
            setSelectedData
          )
        }
        initialState={{
          pagination: {
            paginationModel: { pageSize: 50, page: 0 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        components={{ Toolbar: CustomToolbar }}
      />
    </Fragment>
  );
}
