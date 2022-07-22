import React from "react";
import { Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Register from "./pages/Register";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
};

export default App;
