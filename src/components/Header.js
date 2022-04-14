import React, { useState } from "react";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function Header() {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const pages = [
        { name: "Identify", url: "/" },
        { name: "Search", url: "/#/search" },
    ];

    const handleOpenMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Box>
                        <Link href="/" sx={{ textDecoration: "none" }}>
                            <Box sx={{width: ["80%", "90%", "100%", "100%"]}}>
                                <img src="images/logo.png" alt="Logo" width="100%"/>
                            </Box>
                        </Link>
                    </Box>
                    <Box sx={{flowGrow: 1, display: {xs: "none", sm: "flex"}}}>
                        { pages.map((page, key) => (
                            <Link
                                key={key}
                                href={page.url}
                            >
                                <Box sx={{ my: 2, color: 'white', display: 'block', ml: 4 }}>
                                    {page.name}
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{flowGrow: 1, display: {xs: "flex", sm: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseMenu}
                            sx={{
                              display: { xs: 'block', sm: 'none' },
                            }}
                        >
                            { pages.map((page, key) => (
                                <MenuItem 
                                    key={key} 
                                    onClick={handleCloseMenu}
                                >
                                    <Link
                                        key={key}
                                        href={page.url}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
