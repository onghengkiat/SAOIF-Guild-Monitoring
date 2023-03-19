import React, { useRef } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { ROLES, ROLES_LABELS } from '../../constants/userRoles';

import { 
    addUser,
} from './API';

export default function AddDialog({ setOpenAddDialog, openAddDialog, setData, setSnackbarMessage, setLoading }) {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const gameIDRef = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);


    const handleClose = async () => {
        setOpenAddDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const confirmPassword = confirmPasswordRef.current.value;
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            gameID: gameIDRef.current.value,
            roles: [{ name: roleRef.current.value }],
            active: true,
            blacklisted: false,
            blacklistReason: "",
            blacklistSource: "",
        }

        if (payload.password !== confirmPassword) {
            setSnackbarMessage({
                severity: "error",
                message: "密碼和確認密碼不符合",
            });
        } else {
            setLoading(true);

            await addUser(payload, setSnackbarMessage, setData, setOpenAddDialog);

            setLoading(false);
        }
    }

    return (
        <Dialog
            component="form"
            open={openAddDialog}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                新增用戶
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="username"
                    label="用戶名"
                    margin="normal"
                    fullWidth
                    required
                    inputRef={usernameRef}
                />
                <TextField
                    id="password"
                    label="密碼"
                    type="password"
                    margin="normal"
                    autoComplete="new-password"
                    fullWidth
                    required
                    inputRef={passwordRef}
                />
                <TextField
                    id="confirmPassword"
                    label="確認密碼"
                    type="password"
                    margin="normal"
                    fullWidth
                    required
                    inputRef={confirmPasswordRef}
                />
                <TextField
                    id="name"
                    label="名稱"
                    margin="normal"
                    fullWidth
                    required
                    inputRef={nameRef}
                />
                <TextField
                    id="gameID"
                    label="遊戲ID"
                    margin="normal"
                    fullWidth
                    required
                    inputRef={gameIDRef}
                />
                <TextField
                    id="role"
                    label="職位"
                    margin="normal"
                    fullWidth
                    select
                    required
                    inputRef={roleRef}
                >
                    {
                        Object.values(ROLES).map((value, _) => <MenuItem key={value} value={value}>{ROLES_LABELS[value]}</MenuItem>)
                    }
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    提交
                </Button>
            </DialogActions>
        </Dialog>
    );
}