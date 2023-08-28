import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Patient from "./Patient";

function Home() {

    
  const [data, setData] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);


  const [showAll, setShowAll] = useState(true)
  const [showPositives, setShowPositive] = useState(false)
  const [showNegatives, setShowNegatives] = useState(false)
  
  

  useEffect(() => {
    if (shouldFetch) {
      // Fetch data from the database
      fetch("http://127.0.0.1:8000/patient/scanresults/")
        .then((response) => response.json())
        .then((data) => {
          setData(data.results);
          setShouldFetch(false);
        })
        .catch((error) => {
          alert("Error fetching data:", error);
          setShouldFetch(false);
        });
      }
    }, [shouldFetch]);

    // fetching number of individaul scans
  const positiveCount = data.filter(patient => patient.result === "positive").length;
  const negativeCount = data.filter(patient => patient.result === "negative").length;



  let PositiveList = []
  let NegativesList = []

  PositiveList = data.filter(patient => patient.result === "positive")
  NegativesList = data.filter(patient => patient.result === "negative")
  

console.log(data)
  // function to navigate between negative, positive and general
  const handlePositiveClick = () => {
    setShowAll(false)
    setShowPositive(true)
    setShowNegatives(false)
    
  }
  const handleNegativeClick = () => {
    setShowAll(false)
    setShowPositive(false)
    setShowNegatives(true)
    
  }
  const handleGeneralClick = () => {
    setShowAll(true)
    setShowPositive(false)
    setShowNegatives(false)
  }


  return (
    <>
      <Layout>
        <p className="text-gray-700 text-3xl mb-10 font-bold">Dashboard</p>
        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          <div onClick={handleGeneralClick} className="rounded bg-white h-40 shadow-sm flex flex-col justify-center items-left pl-10 hover:scale-95 transition-transform">
            <section>
              <h1 className="text-2xl font-bold text-gray-500 ">Number Of Scans:</h1>
            </section>
            <section>
            <h1 className="text-6xl font-semibold text-orange-400 hover:text-gray-500">{data.length}</h1>
            </section>
          </div>
          <div onClick={handlePositiveClick} className="rounded bg-white h-40 shadow-sm flex flex-col justify-center items-left pl-10 hover:scale-95 transition-transform">
            <section>
              <h1 className="text-2xl font-bold text-gray-500">Total Positive Scans:</h1>
            </section>
            <section>
            <h1 className="text-6xl font-semibold text-orange-400 hover:text-gray-500">{positiveCount}</h1>
            </section>
          </div>
          <div onClick={handleNegativeClick} className="rounded bg-white h-40 shadow-sm flex flex-col justify-center items-left pl-10 hover:scale-95 transition-transfor ">
            <section>
              <h1 className="text-2xl font-bold text-gray-500">Total Negative Scans:</h1>
            </section>
            <section>
            <h1 className="text-6xl font-semibold text-orange-400 y-500 hover:text-gray-500">{negativeCount}</h1>
            </section>
          </div>
        </div>



        {showAll && 
        <><p className="text-gray-700 text-3xl mb-5 font-bold">Recent Scans</p>
        <div className=" py-5 px-10 rounded-xl items-center col-1 bg-white h-auto shadow-sm gap-5  text-gray-500">
            {data.map((tuple, key) => (
              <div key={key} className="flex items-center ">
                <div className="flex-1">
                  <span>{tuple.scan_id}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.patient_name}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.date}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.result}</span>
                </div>
              </div>
            ))}
          </div></>}
        {showPositives && 
        <><p className="text-gray-700 text-3xl mb-5 font-bold">Positive Scans</p>
        <div className=" py-5 px-10 rounded-xl items-center col-1 bg-white h-auto shadow-sm gap-5  text-gray-500">
            {PositiveList.map((tuple, key) => (
              <div key={key} className="flex items-center ">
                <div className="flex-1">
                  <span>{tuple.scan_id}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.patient_name}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.date}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.result}</span>
                </div>
              </div>
            ))}
          </div></>}
        {showNegatives && 
        <><p className="text-gray-700 text-3xl mb-5 font-bold">Negative Scans</p>
        <div className=" py-5 px-10 rounded-xl items-center col-1 bg-white h-auto shadow-sm gap-5  text-gray-500">
            {NegativesList.map((tuple, key) => (
              <div key={key} className="flex items-center ">
                <div className="flex-1">
                  <span>{tuple.scan_id}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.patient_name}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.date}</span>
                </div>
                <div className="flex-1">
                  <span>{tuple.result}</span>
                </div>
              </div>
            ))}
          </div></>}
        
      </Layout>
    </>
  );
}



export default Home;
