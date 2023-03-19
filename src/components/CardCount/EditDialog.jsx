import React, { useEffect, useRef, useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { 
    updateCardCounts,
} from './API';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { PAGES_LABELS } from '../../constants/card';
import { ExpandMore } from '@mui/icons-material';

export default function EditDialog({ setSnackbarMessage, setOpenEditDialog, openEditDialog, editDialogData, setData, setLoading, categoriesAndSubcategories, selectedPage }) {
    const [subcategoriesData, setSubcategoriesData] = useState({});


    const handleClose = async () => {
        setOpenEditDialog(false);
    }

    useEffect(() => {
        setSubcategoriesData({});
    }, [editDialogData])

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        const payload = Object.entries(subcategoriesData).map(([category_id, count]) => ({
            
            count: Number(count),
            category: {
                id: Number(category_id),
            },
            user: {
                id: Number(editDialogData?.id)
            }
          }));

        await updateCardCounts(editDialogData?.id, payload, setSnackbarMessage, setData, setOpenEditDialog);
        
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
                編輯卡牌統計  ({PAGES_LABELS[selectedPage]})
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="用戶名稱"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={editDialogData?.name}
                />
                {
                    ...categoriesAndSubcategories?.map((category, _) => {
                        return <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography component="h5" color="primary">
                                    {category.label}
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {...category.subcategories?.map((subcategory) => {
                                            return <TextField
                                                id={String(subcategory.id)}
                                                label={subcategory.label}
                                                margin="normal"
                                                type="number"
                                                fullWidth
                                                required
                                                InputProps={{
                                                    inputProps: { 
                                                        max: 100, min: 0 
                                                    }
                                                }}
                                                defaultValue={editDialogData?.[subcategory.id] ? editDialogData[subcategory.id] : 0}
                                                onChange={(event) => {
                                                    setSubcategoriesData((prevData) => {
                                                        return {
                                                            ...prevData,
                                                            [subcategory.id]: event.target.value,
                                                        };
                                                    })
                                                    
                                                }}
                                                />
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                    })
                }
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