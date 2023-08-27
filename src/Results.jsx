



// import { ResultsContext } from "../Context/StateProvider";
import React, { useRef, useState } from "react";

import { addResultToDatabase } from './Services/Services';
import ReactToPrint from "react-to-print";

const Results = React.forwardRef(({ result, setReultReady }, ref) =>  {
    const [docRemarks, setDocRemarks] = useState("");

    const handleSave = () => {
        setReultReady((prev) => !prev);
        addResultToDatabase(result, docRemarks);
    };

    const encodePrefix = "data:image/jpeg;base64,";
    let encodedImage = "";
  
    if (result === null) {
      alert("Error, no response from backend");
    } else {
      encodedImage = encodePrefix + result.image_base64;
    }
    return (
      <>
        <div className="p-5 bg-white rounded-lg w-[80%]" ref={ref}>
          <div className="p-3">
            <h1 className="text-3xl"> Scan Information</h1>
          </div>
  
          <div className="justify-between grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10">
            <section>
              <img className="lg:max-w-[100%] h-[450px] md:max-w-[100%] h-md sm:max-w-[100%] max-h-[100%]" src={encodedImage} alt=""></img>
            </section>
  
            <section className="flex flex-col justify-between">
              <div>
                <div className="flex text-xl gap-10 p-2 bg-slate-50 rounded">
                  <section>
                    <p>Patient ID</p>
                    <p>Name</p>
                    <p>Sex</p>
                    <p>State</p>
                    <p>Class</p>
                  </section>
                  <section>
                    <p>{result.patient_id}</p>
                    <p>{result.patient_name}</p>
                    <p>{result.gender}</p>
                    <p>{result.status}</p>
                    <p>{result.patient_class}</p>
                  </section>
                </div>
                <h3 className="mt-5">Remarks</h3>

                <textarea
                value={docRemarks}
                onChange={(event) => setDocRemarks(event.target.value)}
                name="remarks"
              ></textarea>
              </div>
  
              <div className="flex justify-between">
                <div
                  className={`justify-center py-3 mx-5 rounded text-center w-full cursor-pointer mb-3 flex items-center transition-colors bg-orange-100 text-orange-500 `}
                >
                  <button id="1" onClick={handleSave}>
                    Save
                  </button>
                </div>
                {/* <div
                  className={`justify-center py-3 mx-5 rounded text-center w-full cursor-pointer mb-3 flex items-center transition-colors bg-orange-100 text-orange-500 `}
                >
                 
                </div> */}
              </div>
            </section>
          </div>
        </div>
      </>
    );
})

const ResultPrintComponent = ({ result, setReultReady }) => {
    const componentRef = useRef(null);
  
    return (
      <div>
        <Results
          ref={componentRef}
          result={result}
          setReultReady={setReultReady}
        />
        <PrintButton componentRef={componentRef} />
      </div>
    );
  };
  
  const PrintButton = ({ componentRef }) => (
    <ReactToPrint
      trigger={() => <button>Print Results</button>}
      content={() => componentRef.current}
    />
  );
  export default ResultPrintComponent;















  

