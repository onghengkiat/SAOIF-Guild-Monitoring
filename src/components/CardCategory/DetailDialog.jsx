import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { PAGES_LABELS } from "../../constants/card";

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
                類別詳情
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="ID"
                    label="ID"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.id}
                />
                <TextField
                    id="label"
                    label="類別名"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.label}
                />
                <TextField
                    id="page"
                    label="頁面"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={PAGES_LABELS[detailDialogData?.page]}
                />
                <TextField
                    id="orderNumber"
                    label="排序號碼"
                    margin="normal"
                    type="number"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.orderNumber}
                />
            </DialogContent>
        </Dialog>
    );
}