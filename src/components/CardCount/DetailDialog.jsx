import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { PAGES_LABELS } from "../../constants/card";
import { ExpandMore } from "@mui/icons-material";

export default function DetailDialog({ setOpenDetailDialog, openDetailDialog, detailDialogData, categoriesAndSubcategories, selectedPage }) {
    const handleClose = async () => {
        setOpenDetailDialog(false); 
    }

    return (
        <Dialog
            open={openDetailDialog}
            onClose={handleClose}
        >
            <DialogTitle>
                卡牌統計詳情 ({PAGES_LABELS[selectedPage]})
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="用戶名稱"
                    margin="normal"
                    fullWidth
                    InputProps={{readOnly: true}}
                    value={detailDialogData?.name}
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
                                            return (<TextField
                                                id={String(subcategory.id)}
                                                label={subcategory.label}
                                                margin="normal"
                                                type="number"
                                                fullWidth
                                                InputProps={{readOnly: true}}
                                                value={detailDialogData?.[subcategory.id] ? detailDialogData[subcategory.id] : 0}
                                            />)
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                    })
                }
            </DialogContent>
        </Dialog>
    );
}