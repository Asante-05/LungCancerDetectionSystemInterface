import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Patient from "./Patient";

function Home() {
  return (
    <>
      <Layout>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          <div className="rounded bg-white h-40 shadow-sm"></div>
          <div className="rounded bg-white h-40 shadow-sm"></div>
          <div className="rounded bg-white h-40 shadow-sm"></div>
        </div>
        
      </Layout>
    </>
  );
}



export default Home;
