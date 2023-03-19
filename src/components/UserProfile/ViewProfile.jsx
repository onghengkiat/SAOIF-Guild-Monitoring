import React, { Fragment } from 'react';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ROLES_LABELS } from '../../constants/userRoles';

function ProfileRow({field, value}) {
    return (
        <Fragment>
            <Grid item xs={4}>
                <Typography variant="subtitle2">
                    {field}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="subtitle2" color="text.secondary">
                    {value}
                </Typography>
            </Grid>
        </Fragment>
    );
};

export default function ViewProfile({ data, setEditing, setChangingPassword }){

    const handleChangePassword = () => {
        setChangingPassword(true);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const profileData = [
        {
            field: "用戶名",
            value: data?.username,
        },
        {
            field: "名稱",
            value: data?.name,
        },
        {
            field: "職位",
            value: ROLES_LABELS[data?.role],
        },
        {
            field: "遊戲ID",
            value: data?.gameID,
        },
    ]
    
    return (
        <Fragment>
            <CardContent>
                <Grid container spacing={2}>
                    {
                        profileData.map((row, _) => <ProfileRow key={row.field} field={row.field} value={row.value}/>)
                    }
                </Grid>
            </CardContent>
            <CardActions sx={{justifyContent: "center"}}>
                <Button variant="outlined" onClick={handleChangePassword}>更改密碼</Button>
                <Button variant="outlined" onClick={handleEdit}>更改資料</Button>
            </CardActions>
        </Fragment>
    );
};