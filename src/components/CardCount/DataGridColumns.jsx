import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

import React from "react";


export default function getColumns(setOpenDetailDialog, setOpenEditDialog, setSelectedData, subcategories) {
  return [
      {
          field: "actions",
          headerName: "動作",
          width: 80,
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
              </Box>
          )  
      },
      { 
          field: 'name', 
          headerName: '用戶名稱',
          hideable: false,
          width: 200,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      ...subcategories.map((subcategory, _) => {
        return ({ 
            field: String(subcategory.id), 
            headerName: subcategory.label,
            width: 200,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            renderCell: (params) => params.value ? params.value : 0,
        })
      })
      
  ];
};