import React, { useEffect, useRef, useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { 
    addSubcategory,
} from './API';
import { MenuItem } from '@mui/material';
import { PAGES, PAGES_LABELS } from '../../constants/card';

export default function AddDialog({ setOpenAddDialog, openAddDialog, setData, setSnackbarMessage, setLoading, categoriesIds }) {
    const labelRef = useRef(null);
    const orderNumberRef = useRef(null);
    const [selectedPage, setSelectedPage] = useState("")
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState("")
    const [availableCategories, setAvailableCategories] = useState([])

    const handleClose = async () => {
        setOpenAddDialog(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const payload = {
            label: labelRef.current.value,
            parentCategory: {id: selectedParentCategoryId},
            orderNumber: orderNumberRef.current.value,
        }

        setLoading(true);

        await addSubcategory(payload, setSnackbarMessage, setData, setOpenAddDialog, categoriesIds);

        setLoading(false);
    }

    useEffect(() => {
        const newAvailableCategories = categoriesIds?.filter((value) => {
            return value.page === selectedPage
        })
        setAvailableCategories(newAvailableCategories)
        setSelectedParentCategoryId("")
    }, [selectedPage])

    return (
        <Dialog
            component="form"
            open={openAddDialog}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <DialogTitle>
                新增副類別
            </DialogTitle>
            <DialogContent>
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
                    inputRef={labelRef}
                />
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