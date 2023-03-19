import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { ROLES, ROLES_LABELS } from "../../constants/userRoles";

export default function DetailDialog({ setOpenDetailDialog, openDetailDialog, detailDialogData }) {
    const handleClose = async () => {
        setOpenDetailDialog(false);
    }

    return (
        <Dialog
            open={openDetailDialog}
            onClose={handleClose}
        >
            <DialogTitle>
                用戶詳情
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="username"
                    label="用戶名"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.username}
                />
                <TextField
                    id="name"
                    label="名稱"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.name}
                />
                <TextField
                    id="gameID"
                    label="遊戲ID"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.gameID}
                />
                <TextField
                    id="role"
                    label="職位"
                    margin="normal"
                    select
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.role}
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
                    InputProps={{readOnly: true}}
                    value={String(detailDialogData?.active)}
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
                    InputProps={{readOnly: true}}
                    value={String(detailDialogData?.blacklisted)}
                >
                    <MenuItem key="true" value="true">是</MenuItem>
                    <MenuItem key="false" value="false">否</MenuItem>
                </TextField>
                <TextField
                    id="blacklistSource"
                    label="黑名單出處"
                    margin="normal"
                    InputProps={{readOnly: true}}
                    fullWidth
                    value={detailDialogData?.blacklistSource}
                />
                <TextField
                    id="blacklistReason"
                    label="黑名單原因"
                    margin="normal"
                    InputProps={{readOnly: true}}
                    multiline
                    maxRows={5}
                    fullWidth
                    value={detailDialogData?.blacklistReason}
                />
            </DialogContent>
        </Dialog>
    );
}