import React from "react";
import { NavLink } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function Footer() {
    return (
        <Container
            sx={{
                borderTop: 1,
                borderColor: "grey.300",
                my: 5,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    my: 1,
                }}
            >
                <NavLink
                    to="/privacy"
                    style={{ color: "gray", textDecoration: "none" }}
                >
                    Privacy Policy
                </NavLink>
                <Link
                    href="https://www.flaticon.com/free-icons/dog"
                    underline="none"
                    target="_blank"
                    color="gray"
                >
                    Dog icons created by Freepik - Flaticon
                </Link>
            </Box>
            <Box sx={{ fontSize: 10, color: "gray", mt: 2 }}>
                &copy; Devitizen 2022. All Rights Reserved.
            </Box>
        </Container>
    );
}

export default Footer;
