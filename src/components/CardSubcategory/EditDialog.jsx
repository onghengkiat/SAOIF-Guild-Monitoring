import React, { useEffect, useRef, useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { 
    updateSubcategory,
} from './API';
import { MenuItem } from '@mui/material';
import { PAGES, PAGES_LABELS } from '../../constants/card';

export default function EditDialog({ setSnackbarMessage, setOpenEditDialog, openEditDialog, editDialogData, setData, setLoading, categoriesIds }) {
    const labelRef = useRef(null);
    const orderNumberRef = useRef(null);
    const [selectedPage, setSelectedPage] = useState("")
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState("")
    const [availableCategories, setAvailableCategories] = useState([])

    const handleClose = async () => {
        setOpenEditDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
    
        const payload = {
            id: editDialogData.id,
            label: labelRef.current.value,
            parentCategory: {id: selectedParentCategoryId},
            orderNumber: orderNumberRef.current.value,
        }

        setLoading(true);

        await updateSubcategory(payload, setSnackbarMessage, setData, setOpenEditDialog);
        
        setLoading(false);
    }

    useEffect(() => {
        setSelectedPage(editDialogData?.parentCategoryPage)
    }, [editDialogData])

    useEffect(() => {
        const newAvailableCategories = categoriesIds?.filter((value) => {
            return value.page === selectedPage
        })
        setAvailableCategories(newAvailableCategories)

        let parentCategoryIdStillAvailable = false;
        for (let i = 0 ; i < newAvailableCategories?.length; i++) {
            if (newAvailableCategories[i].id === editDialogData?.parentCategoryId) {
                parentCategoryIdStillAvailable = true;
                break;
            }
        }

        if (parentCategoryIdStillAvailable) {
            setSelectedParentCategoryId(editDialogData.parentCategoryId);
        } else {
            setSelectedParentCategoryId("")
        }
    }, [selectedPage])

    return (
        <Dialog
            component="form"
            open={openEditDialog}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                編輯副類別
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
                    value={selectedPage ?? ""}
                    onChange={(e) => setSelectedPage(e.target.value)}
                >
                    {
                        Object.values(PAGES).map((value, _) => <MenuItem key={value} value={value}>{PAGES_LABELS[value]}</MenuItem>)
                    }
                </TextField>
                <TextField
                    id="parentCategoryId"
                    label="主類別"
                    margin="normal"
                    fullWidth
                    select
                    required
                    value={selectedParentCategoryId}
                    onChange={(e) => setSelectedParentCategoryId(e.target.value)}
                >
                    {
                        availableCategories.map((value, _) => <MenuItem key={value.id} value={value.id}>{value.label}</MenuItem>)
                    }
                </TextField>
                <TextField
                    id="label"
                    label="副類別名"
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