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
    updateUser,
} from './API';

export default function EditDialog({ setSnackbarMessage, setOpenEditDialog, openEditDialog, editDialogData, setData, setLoading }) {
    const usernameRef = useRef(null);
    const gameIDRef = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const isBlacklistedRef = useRef(null);
    const blacklistReasonRef = useRef(null);
    const blacklistSourceRef = useRef(null);
    const isActiveRef = useRef(null);


    const handleClose = async () => {
        setOpenEditDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            id: editDialogData.id,
            username: usernameRef.current.value,
            name: nameRef.current.value,
            gameID: gameIDRef.current.value,
            roles: [{ name: roleRef.current.value}],
            active: isActiveRef.current.value === "true",
            blacklisted: isBlacklistedRef.current.value === "true",
            blacklistReason: blacklistReasonRef.current.value,
            blacklistSource: blacklistSourceRef.current.value,
        }
        

        setLoading(true);

        await updateUser(payload, setSnackbarMessage, setData, setOpenEditDialog);
        
        setLoading(false);
    }

    return (
        <Dialog
            component="form"
            open={openEditDialog}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                編輯用戶
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="username"
                    label="用戶名"
                    margin="normal"
                    fullWidth
                    required
                    defaultValue={editDialogData?.username}
                    inputRef={usernameRef}
                />
                <TextField
                    id="name"
                    label="名稱"
                    margin="normal"
                    fullWidth
                    required
                    defaultValue={editDialogData?.name}
                    inputRef={nameRef}
                />
                <TextField
                    id="gameID"
                    label="遊戲ID"
                    margin="normal"
                    fullWidth
                    required
                    defaultValue={editDialogData?.gameID}
                    inputRef={gameIDRef}
                />
                <TextField
                    id="role"
                    label="職位"
                    margin="normal"
                    fullWidth
                    select
                    required
                    defaultValue={editDialogData?.role}
                    inputRef={roleRef}
                >
                    {
                        Object.values(ROLES).map((value, _) => <MenuItem key={value} value={value}>{ROLES_LABELS[value]}</MenuItem>)
                    }
                </TextField>
                <TextField
                    id="isActive"
                    label="活躍中？"
                    margin="normal"
                    select
                    fullWidth
                    required
                    defaultValue={String(editDialogData?.active)}
                    inputRef={isActiveRef}
                >
                    <MenuItem key="true" value="true">是</MenuItem>
                    <MenuItem key="false" value="false">否</MenuItem>
                </TextField>
                <TextField
                    id="isBlacklisted"
                    label="黑名單？"
                    margin="normal"
                    select
                    fullWidth
                    required
                    defaultValue={String(editDialogData?.blacklisted)}
                    inputRef={isBlacklistedRef}
                >
                    <MenuItem key="true" value="true">是</MenuItem>
                    <MenuItem key="false" value="false">否</MenuItem>
                </TextField>
                <TextField
                    id="blacklistSource"
                    label="黑名單出處"
                    margin="normal"
                    fullWidth
                    defaultValue={editDialogData?.blacklistSource}
                    inputRef={blacklistSourceRef}
                />
                <TextField
                    id="blacklistReason"
                    label="黑名單原因"
                    margin="normal"
                    multiline
                    maxRows={5}
                    fullWidth
                    defaultValue={editDialogData?.blacklistReason}
                    inputRef={blacklistReasonRef}
                />
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