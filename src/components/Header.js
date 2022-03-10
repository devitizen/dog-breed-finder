import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function Header() {
    return (
        <Container
            sx={{ borderBottom: 1, borderColor: "grey.300", py: 2, pl: 2 }}
        >
            <Link href="/" sx={{ textDecoration: "none" }}>
                <Stack direction="row">
                    <img src="images/favicon-32x32.png" alt="Logo" />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ pl: 2, color: "#1976d2" }}
                    >
                        Dog Breed Finder
                    </Typography>
                </Stack>
            </Link>
        </Container>
    );
}

export default Header;
