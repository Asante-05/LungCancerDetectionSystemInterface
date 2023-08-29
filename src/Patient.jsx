import React, { Fragment, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { getScanInformation, uploadFile } from "./Services/Services";
import Viewscreen from "./Viewscreen";
import Confirmation from "./Confirmation";
import ResultPrintComponent from "./Results";
import Upload from "./Upload";
import { Menu, Transition, Popover } from "@headlessui/react";

function Patient() {
  const heading = ["Scan ID", "Name", "Date", "Results", "View", "Delete"];

  const [viewdata, setViewData] = useState();
  const [delData, setDelData] = useState();

  const [ViewDelConfirmation, setViewDelConfirmation] = useState(false);

  const [viewParticular, setViewParticular] = useState(false);

  const [data, setData] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
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

  const setView = () => {
    setViewParticular((previewParticular) => !previewParticular);
  };

  async function handleItemClick(item) {
    try {
      const viewResponse = await getScanInformation(item.scan_id);
      setViewData(viewResponse);
      setView();
    } catch (error) {
      throw new Error("An error was encountered", error);
    }
  }

  const handleDeleteModalClose = () => {
    setViewDelConfirmation(false);
  };

  function handleDeleteModalOpen(item) {
    setViewDelConfirmation((ViewDelConfirmation) => !ViewDelConfirmation);
  }

  function handleDeleteClick(item) {
    setDelData(item);
    setViewDelConfirmation(true);
  }

  useEffect(() => {
    handleDeleteModalOpen();
  }, [viewdata]);

  // =========================================================================================================================================
  // uplaod funcs
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [patient_id, setPatient_id] = useState();
  const [resultReady, setResultReady] = useState(false);

  const [r, setR] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    console.log("click");
    try {
      const response = await uploadFile(patient_id, selectedFile);
      if (response.non_field_errors) {
        alert(response.non_field_errors[0]);
      } else {
        setR(response);
        setResultReady(true);
      }
    } catch (error) {
      alert("Error uploading file (Front):", error);
    }
  };
  // ================================================================================================================================================

  const [searchString, setSearchString] = useState("");

  // const filteredItems = data.filter(item => item.patient_name.toLowerCase().includes(searchString.toLowerCase()) || item.patient_id.toString().includes(searchString))
  const filteredItems = data.filter((item) =>
    item.patient_name.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <Layout>
      {!viewParticular && !resultReady && (
        <>
          <div className="flex gap-2 justify-center items-center ">
            <div className="flex w-[85%] justify-center items-center  rounded-full bg-white  py-2 mb-5">
              <div className="w-[100%] flex justify-between ">
                <section className="w-[100%]  flex items-center justify-center">
                  <input
                    value={searchString}
                    hidden={false}
                    onChange={(e) => setSearchString(e.target.value)}
                    className=" rounded-full w-[90%] h-[90%]  bg-white-700 px-5 shadow  focus:border-blue-500 focus:bg-lightGrey focus:outline-none"
                    type="text"
                    placeholder="search for patients here with Id of the patient"
                  />
                </section>
                <section className="">
                  <button className=" mr-3  cursor-pointern shadow-lg  bg-b100 text-gray-700 flex rounded-full text-center items-center transition-colors hover:bg-b200 hover:text-blue py-3 lg:px-16 md:px-8 sm:px-8">
                    Search
                  </button>
                </section>
              </div>
            </div>

            <div className="">
              <Popover className="relative">
                <Popover.Button className=" mr-5 md:mr-8 cursor-pointer shadow-lg  bg-b100 text-gray-700 flex gap-2   p-6 py-3  rounded text-center   items-center transition-colors   hover:bg-b200 hover:text-blue">
                  New Scan
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform scale-95"
                  enterTo="transform scale-100"
                  leave="transition ease-in duration=75"
                  leaveFrom="transform scale-100"
                  leaveTo="transform scale-95"
                >
                  <Popover.Panel className="absolute flex align-center justify-between h-60  sm:right-4 z-50 mt-2 bg-white shadow-lg rounded max-w-xs sm:max-w-sm w-screen">
                    <div className="relative p-3 w-96 h-auto">
                      <div className="flex justify-between items-center w-full">
                        <p className="text-grey font-medium">
                          Perform a new scan
                        </p>
                        <a className="text-sm text-b500" href="#">
                          for existing patients
                        </a>
                      </div>

                      <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                        <div className="flex justify-between">
                          <h3>Enter Patient ID</h3>
                          <input
                            value={patient_id}
                            onChange={(event) =>
                              setPatient_id(event.target.value)
                            }
                            id="id"
                            type="text"
                            placeholder="FA-2128-22"
                            className="border focus:border-orange-500"
                          ></input>
                        </div>

                        <div className="flex  justify-center item-center border border-dashed border-black p-4">
                          <h1>Drop File here</h1>
                          <h1> or </h1>
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                            <button
                              className=""
                              onClick={openFileDialog}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ">
                          <button
                            className={` p-6 py-3 mx-5 rounded shadow-lg text-center cursor-pointer mb-3 w-[40%] flex items-center justify-center transition-colors text-gray-400 hover:bg-b200 hover:text-500`}
                          >
                            Cancel
                          </button>
                          <button
                            className={` p-6 py-3 mx-5 rounded shadow-lg text-center cursor-pointer mb-3 w-[40%] flex items-center justify-center transition-colors text-gray-400 hover:bg-b200 hover:text-500`}
                            onClick={() => handleFileUpload()}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>

          <div className=" mb-14 ">
            <div className=" py-5 px-10 flex items-center rounded-[10px]  bg-white text-2xl h-20 shadow-sm ">
              {heading.map((head, key) => (
                <span className="flex-1" key={key}>
                  {head}
                </span>
              ))}
            </div>
          </div>

          <div className=" py-5 px-10 overflow-y-scroll scroll-smooth rounded-xl items-center col-1 bg-white h-96 shadow-sm gap-5">
            {filteredItems.map((tuple, key) => (
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
                <div className="flex-1">
                  <button>
                    <svg
                      onClick={() => handleItemClick(tuple)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fill-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1">
                  <button>
                    <svg
                      onClick={() => handleDeleteClick(tuple)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewParticular && <Viewscreen response={viewdata} setView={setView} />}

      {resultReady && !viewParticular && (
        <ResultPrintComponent result={r} setReultReady={setResultReady} />
      )}

      {ViewDelConfirmation && (
        <Confirmation
          onClose={handleDeleteModalClose}
          isOpen={ViewDelConfirmation}
          res={delData}
          onConfirm={handleDeleteModalClose}
        />
      )}
    </Layout>
  );
}

const YourComponent = ({ heading, items }) => {
  return (
    <div>
      <h2 className="mb-4">{heading}</h2>
      {items.map((item, index) => (
        <div key={index} className="flex">
          <p className="flex-1">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Patient;
