import React, { useRef } from 'react';

import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import { 
    changePassword,
} from './API';
import { CardActions } from '@mui/material';

export default function ChangePassword({ setChangingPassword, setSnackbarMessage, setLoading }) {
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmNewPasswordRef = useRef(null);


    const handleBack = () => {
        setChangingPassword(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const confirmNewPassword = confirmNewPasswordRef.current.value;

        const payload = {
            oldPassword: oldPasswordRef.current.value,
            newPassword: newPasswordRef.current.value,
        }

        if (payload.newPassword !== confirmNewPassword) {
            setSnackbarMessage({
                severity: "error",
                message: "新密碼和確認新密碼不符合",
            });
        } else {
            setLoading(true);

            await changePassword(payload, setSnackbarMessage, setChangingPassword)

            setLoading(false);
        };
    };

    return (
        <CardContent component="form" sx={{textAlign: "center"}} onSubmit={handleSubmit}>
            <TextField
                id="oldPassword"
                label="舊密碼"
                type="password"
                margin="normal"
                autoComplete="current-password"
                fullWidth
                required
                inputRef={oldPasswordRef}
            />
            <TextField
                id="newPassword"
                label="新密碼"
                type="password"
                margin="normal"
                autoComplete="new-password"
                fullWidth
                required
                inputRef={newPasswordRef}
            />
            <TextField
                id="confirmNewPassword"
                label="確認新密碼"
                type="password"
                margin="normal"
                fullWidth
                required
                inputRef={confirmNewPasswordRef}
            />
            <CardActions sx={{justifyContent: "center"}}>
                <Button variant="outlined" onClick={handleBack}>
                    返回
                </Button>
                <Button variant="outlined" type="submit">
                    保存
                </Button>
            </CardActions>
        </CardContent>
    );
};