import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "components/Navbar";
import Search from "pages/Search";
import Titlebar from "components/Titlebar";
import Results from "pages/Results";
import Info from "pages/Info";

const RootRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Titlebar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RootRoutes;
