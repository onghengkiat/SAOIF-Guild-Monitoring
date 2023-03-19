import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';

import { 
    deleteSubcategory,
} from "./API";

export default function DeleteConfirmDialog({ setSnackbarMessage, setOpenDeleteConfirmDialog, openDeleteConfirmDialog, deletedRow, setData, setLoading }) {

    const handleNo = () => {
        setOpenDeleteConfirmDialog(false);
    };
    
    const handleYes = async () => {
        const payload = {
            id: deletedRow.id,
        };

        setLoading(true);

        await deleteSubcategory(payload, setSnackbarMessage, setData, setOpenDeleteConfirmDialog)

        setLoading(false);
    };


    if (!deletedRow) {
        return null;
    }

    return (
        <Dialog
            maxWidth="xs"
            open={openDeleteConfirmDialog}
        >
            <DialogTitle>確定？</DialogTitle>
                <DialogContent dividers>
                    {`刪除此副類別？ 副類別名: '${deletedRow.label}'.`}
                </DialogContent>
            <DialogActions>
                <Button onClick={handleNo}>
                    否
                </Button>
                <Button onClick={handleYes}>
                    是
                </Button>
            </DialogActions>
        </Dialog>
    );
};
