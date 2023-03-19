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
    addCategory,
} from './API';

export default function AddDialog({ setOpenAddDialog, openAddDialog, setData, setSnackbarMessage, setLoading }) {
    const labelRef = useRef(null);
    const pageRef = useRef(null);
    const orderNumberRef = useRef(null);

    const handleClose = async () => {
        setOpenAddDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const payload = {
            label: labelRef.current.value,
            page: pageRef.current.value,
            orderNumber: orderNumberRef.current.value,
        }

        setLoading(true);

        await addCategory(payload, setSnackbarMessage, setData, setOpenAddDialog);

        setLoading(false);
    }

    return (
        <Dialog
            component="form"
            open={openAddDialog}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                新增類別
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="label"
                    label="類別名"
                    margin="normal"
                    fullWidth
                    required
                    inputRef={labelRef}
                />
                <TextField
                    id="page"
                    label="頁面"
                    margin="normal"
                    fullWidth
                    select
                    required
                    inputRef={pageRef}
                >
                    {
                        Object.values(PAGES).map((value, _) => <MenuItem key={value} value={value}>{PAGES_LABELS[value]}</MenuItem>)
                    }
                </TextField>
                <TextField
                    id="orderNumber"
                    label="排序號碼"
                    margin="normal"
                    type="number"
                    fullWidth
                    required
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