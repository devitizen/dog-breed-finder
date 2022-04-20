import React from "react";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function PageLink(props) {
    return (
        <>
        <Container>
            <Link
                href={props.path}
                underline="hover"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    mt: 5,
                    mr: 2,
                    fontWeight: 500,
                    fontSize: [14, 16],
                }}
            >
                <NavigateNextIcon /> Go to {props.name}
            </Link>
        </Container>
        </>
    );
}

export { PageLink };
