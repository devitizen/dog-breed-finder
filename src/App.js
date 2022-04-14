import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";
import Identify from "./components/Identify";
import Search from "./components/Search";

export default function App() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Identify />} />
                <Route path="/search" element={<Search />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
}
