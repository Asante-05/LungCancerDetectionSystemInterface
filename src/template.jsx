// import "./Results.css";

// import { useNavigate } from "react-router-dom";

// import { ResultsContext } from "../Context/StateProvider";
// import React, { useContext, useRef, useState } from "react";

// import { addResultToDatabase } from "../services/services";
// import ReactToPrint from "react-to-print";

// const Results = React.forwardRef(({ result, setReultReady }, ref) => {
//   const navigate = useNavigate();
//   const [docRemarks, setDocRemarks] = useState("");
//   const { items, addItem } = useContext(ResultsContext);

  
//   const handleSave = () => {
//     addItem(result);
//     setReultReady((prev) => !prev);
//     addResultToDatabase(result, docRemarks);
//   };

//   const encodePrefix = "data:image/jpeg;base64,";
//   let encodedImage = "";

//   if (result === null) {
//     alert("Error, no response from backend");
//   } else {
//     encodedImage = encodePrefix + result.image_base64;
//   }

//   return (
//     <>
//       <div className="results_mainBody" ref={ref}>
//         <div className="results_header">
//           <h1>Results</h1>
//         </div>
//         <div className="results_detail">
//           <div className="results_img">
//             <img src={encodedImage} alt="cancer image"></img>

//             {/* <img src={`data:image/jpeg;base64,${result.image_path}`} alt="Cancer Image" /> */}
//           </div>

//           <div className="results_info">
//             <div className="results_patientInfo">
//               <div id="detail_top">
//                 <strong>Patient ID</strong>
//                 <strong>Name</strong>
//                 <strong>Sex</strong>
//                 <strong>State</strong>
//                 <strong>Class</strong>
//               </div>

//               <div id="detail_top">
//                 <span>{result.patient_id}</span>
//                 <span>{result.patient_name}</span>
//                 <span>{result.gender}</span>
//                 <span>{result.status}</span>
//                 <span>{result.prediction}</span>
//               </div>
//             </div>

//             <div className="results_input">
//               <h3>Remarks</h3>
//               <textarea
//                 value={docRemarks}
//                 onChange={(event) => setDocRemarks(event.target.value)}
//                 name="remarks"
//               ></textarea>
//             </div>
//             <div className="results_buttons">
//               <button id="1" onClick={handleSave}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// });

// const ResultPrintComponent = ({ result, setReultReady }) => {
//   const componentRef = useRef(null);

//   return (
//     <div>
//       <Results
//         ref={componentRef}
//         result={result}
//         setReultReady={setReultReady}
//       />

//       <PrintButton componentRef={componentRef} />
//     </div>
//   );
// };

// const PrintButton = ({ componentRef }) => (
//   <ReactToPrint
//     trigger={() => <button>Print Results</button>}
//     content={() => componentRef.current}
//   />
// );
// export default ResultPrintComponent;
