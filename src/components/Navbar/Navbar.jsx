import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { 
    Drawer,
    AppBar,
} from './Drawer';

import {
    NavbarPrimaryItems, 
    NavbarSecondaryItems,
} from './NavbarItems';

const BoxOutsideNavbar = styled(Box)(({theme}) => ({
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
}));

export default function Navbar({ activePage, children, token, setToken, setSnackbarMessage }) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {activePage}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        { open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                 </Toolbar>
                <Divider />
                <List component="nav">
                    <NavbarPrimaryItems activeItem={activePage} token={token}/>
                    <Divider sx={{ my: 1 }} />
                    <NavbarSecondaryItems activeItem={activePage} setToken={setToken} setSnackbarMessage={setSnackbarMessage}/>
                </List>
            </Drawer>
            <BoxOutsideNavbar>
                <Toolbar />
                {children}
            </BoxOutsideNavbar>
      </Box>
    )
}