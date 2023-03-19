import React, { useRef } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { PAGES, PAGES_LABELS } from '../../constants/card';

import { 
    updateCategory,
} from './API';

export default function EditDialog({ setSnackbarMessage, setOpenEditDialog, openEditDialog, editDialogData, setData, setLoading }) {
    const labelRef = useRef(null);
    const pageRef = useRef(null);
    const orderNumberRef = useRef(null);

    const handleClose = async () => {
        setOpenEditDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
    
        const payload = {
            id: editDialogData.id,
            label: labelRef.current.value,
            page: pageRef.current.value,
            orderNumber: orderNumberRef.current.value,
        }
        
        setLoading(true);

        await updateCategory(payload, setSnackbarMessage, setData, setOpenEditDialog);
        
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
                編輯類別
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="ID"
                    label="ID"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={editDialogData?.id}
                />
                <TextField
                    id="page"
                    label="頁面"
                    margin="normal"
                    fullWidth
                    select
                    required
                    defaultValue={editDialogData?.page}
                    inputRef={pageRef}
                >
                    {
                        Object.values(PAGES).map((value, _) => <MenuItem key={value} value={value}>{PAGES_LABELS[value]}</MenuItem>)
                    }
                </TextField>
                <TextField
                    id="label"
                    label="類別名"
                    margin="normal"
                    fullWidth
                    required
                    defaultValue={editDialogData?.label}
                    inputRef={labelRef}
                />
                <TextField
                    id="orderNumber"
                    label="排序號碼"
                    margin="normal"
                    type="number"
                    fullWidth
                    required
                    defaultValue={editDialogData?.orderNumber}
                    InputProps={{
                        inputProps: { 
                            max: 100, min: 0 
                        }
                    }}
                    inputRef={orderNumberRef}
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