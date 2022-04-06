import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Policy from "./components/Policy";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            </Routes>
        </HashRouter>
    );
}

function Home() {
    return (
        <Container>
            <Header />
            <Body />
            <Footer />
        </Container>
    );
}

function PrivacyPolicy() {
    return (
        <Container>
            <Header />
            <Policy />
            <Footer />
        </Container>
    );
}
