import React, { useState, Fragment, useEffect } from "react";
import DetailDialog from "./DetailDialog";
import EditDialog from "./EditDialog";
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

import { getAllCardCounts, getAllCategoriesAndSubcategories } from "./API";
import { Box, MenuItem, TextField } from "@mui/material";
import { PAGES, PAGES_LABELS } from "../../constants/card";

export default function CardCount({ setSnackbarMessage, setLoading }) {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [data, setData] = useState([]);
  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(PAGES.Mod);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!selectedPage) return;

      setLoading(true);

      await getAllCardCounts(setSnackbarMessage, setData, selectedPage);
      await getAllCategoriesAndSubcategories(setSnackbarMessage, setCategoriesAndSubcategories, selectedPage)

      setLoading(false);
    }

    fetchData();
  }, [selectedPage])

  useEffect(() => {

    const tempSelectedCategory = categoriesAndSubcategories?.length > 0 ? categoriesAndSubcategories[0].id : "";
    setSelectedCategory(tempSelectedCategory);

  }, [categoriesAndSubcategories])

  useEffect(() => {
    for (let i = 0 ; i < categoriesAndSubcategories?.length ; i ++) {
      if (categoriesAndSubcategories[i].id === selectedCategory) {
        setAvailableSubcategories(categoriesAndSubcategories[i].subcategories ?? [])
        break;
      }
    }
  }, [selectedCategory])


  function CustomToolbar() {

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" m={2} px={3}>
      卡牌統計
      </Typography>
      <Box
      style={{
        margin: '10px 40px',
        minWidth: '400px',
      }}>
        <TextField
            id="page"
            label="頁面"
            margin="normal"
            select
            required
            fullWidth
            defaultValue={PAGES.Mod}
            onChange={(e) => setSelectedPage(e.target.value)}
        >
            {
                Object.values(PAGES).map((value, _) => <MenuItem key={value} value={value}>{PAGES_LABELS[value]}</MenuItem>)
            }
        </TextField>
        
        <TextField
            id="category"
            label="類別"
            margin="normal"
            fullWidth
            select
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            {
                categoriesAndSubcategories.map((value, _) => <MenuItem key={value.id} value={value.id}>{value.label}</MenuItem>)
            }
        </TextField>
      </Box>

      <DetailDialog
        setOpenDetailDialog={setOpenDetailDialog}
        openDetailDialog={openDetailDialog}
        detailDialogData={selectedData}
        categoriesAndSubcategories={categoriesAndSubcategories}
        selectedPage={selectedPage}
      />
      <EditDialog
        setOpenEditDialog={setOpenEditDialog}
        openEditDialog={openEditDialog}
        setSnackbarMessage={setSnackbarMessage}
        setLoading={setLoading}
        editDialogData={selectedData}
        setData={setData}
        categoriesAndSubcategories={categoriesAndSubcategories}
        selectedPage={selectedPage}
      />
      <StyledDataGrid
        rows={data}
        columns={getColumns(
          setOpenDetailDialog,
          setOpenEditDialog,
          setSelectedData,
          availableSubcategories,
        )}
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
