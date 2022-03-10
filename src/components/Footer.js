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
                my: 10,
            }}
        >
            <Container
                sx={{
                    mx: "auto",
                    width: "90%",
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                        mt: 1,
                    }}
                >
                    <NavLink
                        to="/privacy_policy"
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
                <Box sx={{ fontSize: 12, color: "gray" }}>
                    &copy; Devitizen 2022. All Rights Reserved.
                </Box>
            </Container>
        </Container>
    );
}

export default Footer;
