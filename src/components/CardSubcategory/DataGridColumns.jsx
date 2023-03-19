import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import React from "react";
import { PAGES_LABELS } from "../../constants/card";


export default function getColumns(setOpenDetailDialog, setOpenEditDialog, setOpenDeleteConfirmDialog, setSelectedData) {
  return [
      {
          field: "actions",
          headerName: "動作",
          width: 120,
          hideable: false,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => (
              <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
              >
                  <IconButton onClick={() => {
                    setSelectedData(params.row);
                    setOpenDetailDialog(true);
                  }}>
                      <SearchIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setSelectedData(params.row);
                    setOpenEditDialog(true);
                  }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setSelectedData(params.row);
                    setOpenDeleteConfirmDialog(true);
                  }}>
                      <DeleteIcon />
                  </IconButton>
              </Box>
          )
          
      },
      {
          field: 'parentCategoryPage',
          headerName: '頁面',
          width: 120,
          headerAlign: 'center',
          align: 'center',
          editable: false,
          renderCell: (params) => PAGES_LABELS[params.value],
      },
      { 
          field: 'parentCategoryId', 
          headerName: '主類別ID',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      { 
          field: 'parentCategoryLabel', 
          headerName: '主類別名',
          width: 200,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      { 
          field: 'id', 
          headerName: '副類別ID',
          hideable: false,
          width: 100,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      {
          field: 'label',
          headerName: '副類別名',
          hideable: false,
          width: 200,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      { 
          field: 'orderNumber', 
          headerName: '排序號碼',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
  ];
};