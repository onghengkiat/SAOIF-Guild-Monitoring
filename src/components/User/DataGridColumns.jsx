import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ROLES, ROLES_LABELS } from '../../constants/userRoles';
import React from "react";


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
          field: 'username', 
          headerName: '用戶名',
          hideable: false,
          width: 200,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      { 
          field: 'password', 
          headerName: '密碼',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          renderCell: (params) => "******",
      },
      {
          field: 'name',
          headerName: '名稱',
          width: 300,
          headerAlign: 'center',
          align: 'center',
          editable: false,
      },
      {
          field: 'role',
          headerName: '職位',
          type: 'singleSelect',
          valueOptions: Object.values(ROLES),
          width: 120,
          headerAlign: 'center',
          align: 'center',
          editable: false,
          renderCell: (params) => ROLES_LABELS[params.value],
      },
      {
          field: 'gameID',
          headerName: '遊戲ID',
          headerAlign: 'center',
          align: 'center',
          width: 300,
          sortable: false,
          editable: false,
      },
      {
          field: 'active',
          headerName: '活躍中？',
          headerAlign: 'center',
          type: 'boolean',
          align: 'center',
          width: 80,
          editable: false,
      },
      {
          field: 'blacklisted',
          headerName: '黑名單？',
          headerAlign: 'center',
          type: 'boolean',
          align: 'center',
          width: 80,
          editable: false,
      },
      {
          field: 'blacklistSource',
          headerName: '黑名單出處',
          headerAlign: 'center',
          align: 'center',
          width: 200,
          sortable: false,
          editable: false,
      },
      {
          field: 'blacklistReason',
          headerName: '黑名單原因',
          headerAlign: 'center',
          align: 'center',
          width: 500,
          editable: false,
      },
  ];
};