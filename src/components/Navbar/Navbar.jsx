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
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import {
    NavbarPrimaryItems, 
    NavbarSecondaryItems,
} from './NavbarItems';

const BoxOutsideNavbar = styled(Box)(({theme}) => ({
    flexGrow: 1,
    height: '100vh',
    paddingTop: `${APPBAR_HEIGHT}px`,
    overflow: 'auto',
    background: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
}));

const APPBAR_HEIGHT = 64;

export default function Navbar({ activePage, children, token, setToken, setSnackbarMessage }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <MuiAppBar position="absolute" sx={{height: `${APPBAR_HEIGHT}px`}}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        {activePage}
                    </Typography>
                </Toolbar>
                <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
                    <List component="nav">
                        <NavbarPrimaryItems activeItem={activePage} token={token}/>
                        <Divider sx={{ my: 1 }} />
                        <NavbarSecondaryItems activeItem={activePage} setToken={setToken} setSnackbarMessage={setSnackbarMessage}/>
                    </List>
                </Drawer>
            </MuiAppBar>
            <BoxOutsideNavbar>
                {children}
            </BoxOutsideNavbar>
      </div>
    )
}