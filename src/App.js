import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Policy from "./components/Policy";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <Container>
                <Header />
                <Body />
                <Footer />
            </Container>
        </div>
    );
}

function PrivacyPolicy() {
    return (
        <div>
            <Container>
                <Header />
                <Policy />
                <Footer />
            </Container>
        </div>
    );
}
