import React, { useRef } from "react";

import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { ROLES, ROLES_LABELS } from "../../constants/userRoles";

import { updateUserProfile } from "./API";
import { CardActions } from "@mui/material";

export default function EditProfile({
  data,
  setData,
  setEditing,
  setSnackbarMessage,
  setLoading,
}) {
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  
  const handleBack = () => {
      setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: data?.id,
      name: nameRef.current.value,
      username: usernameRef.current.value,
    };

    setLoading(true);

    await updateUserProfile(payload, setSnackbarMessage, setData, setEditing);

    setLoading(false);
  };

  return (
    <CardContent
      component="form"
      sx={{ textAlign: "center" }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="username"
        label="用戶名"
        margin="normal"
        fullWidth
        required
        defaultValue={data?.username}
        inputRef={usernameRef}
      />
      <TextField
        id="name"
        label="名稱"
        margin="normal"
        fullWidth
        required
        defaultValue={data?.name}
        inputRef={nameRef}
      />
      <TextField
        id="role"
        label="職位"
        margin="normal"
        fullWidth
        select
        required
        disabled
        value={data?.role}
        sx={{ textAlign: "left" }}
      >
        {Object.values(ROLES).map((value, _) => (
          <MenuItem key={value} value={value}>
            {ROLES_LABELS[value]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="gameID"
        label="遊戲ID"
        margin="normal"
        fullWidth
        required
        disabled
        value={data?.gameID}
      />
      <CardActions sx={{justifyContent: "center"}}>
        <Button variant="outlined" onClick={handleBack}>
            返回
        </Button>
        <Button variant="outlined" type="submit">
          保存
        </Button>
      </CardActions>
    </CardContent>
  );
}
