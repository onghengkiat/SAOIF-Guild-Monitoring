import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalculateIcon from '@mui/icons-material/Calculate';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    hasAccess,
} from '../../utils/roleUtils';
import { logoutUser } from '../Login/API';
import { Link } from 'react-router-dom';

const NavbarItem = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== 'isActive' })(
    ({ theme, isActive }) => ({
        ...(isActive && {
            background: theme.palette.grey[300],
        }),
    }),
);

export function NavbarPrimaryItems({ activeItem, token }) {
    
    const items = [
        {
            "label": "卡牌統計",
            "icon": <CalculateIcon />,
            "link": "/card/count",
            "rolesAllowed": ["ADMIN", "USER"],
        },
        {
            "label": "卡牌類別",
            "icon": <CategoryIcon />,
            "link": "/card/category",
            "rolesAllowed": ["ADMIN"],
        },
        {
            "label": "卡牌副類別",
            "icon": <ClassIcon />,
            "link": "/card/subcategory",
            "rolesAllowed": ["ADMIN"],
        },
        {
            "label": "用戶",
            "icon": <PeopleIcon />,
            "link": "/user",
            "rolesAllowed": ["ADMIN"],
        },
    ]

    return (
        <Fragment>
            {
                items.map((item, _) => 
                    hasAccess(token?.role, item.rolesAllowed) ?
                        <NavbarItem component={Link} isActive={activeItem === item.label} to={item.link} key={item.label}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                        </NavbarItem>
                        :
                        null
                )
            }
        </Fragment>
    );
};

export function NavbarSecondaryItems({ activeItem, setToken, setSnackbarMessage }) {
    async function handleLogout() {
        logoutUser(setSnackbarMessage, setToken);
    }

    const items = [
        {
            "label": "個人資料",
            "icon": <PermContactCalendarIcon />,
            "link": "/profile",
        },
        {
            "label": "登出",
            "icon": <LogoutIcon />,
            "link": "/",
            "onClick": handleLogout
        },
    ]

    return (
        <Fragment>
            {
                items.map((item, _) => 
                    <NavbarItem component={Link} isActive={activeItem === item.label} to={item.link} onClick={item.onClick} key={item.label}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </NavbarItem>
                )
            }
        </Fragment>
    );
};