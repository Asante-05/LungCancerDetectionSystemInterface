import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Patient from "./Patient";
import Layout from "./Layout";

function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient" element={<Patient/>} />
 
      </Routes>

    </>
  );
}

export default App;
