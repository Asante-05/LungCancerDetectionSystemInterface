import React from "react";
import { deleteFromDataBase } from "./Services/Services";

function Confirmation({ isOpen, onClose, res }) {
  console.log(res)
  async function handleDeleteClick(item) {
    try {
      const deleteResponse = await deleteFromDataBase(item.scan_id);
      if (deleteResponse.message) {
        window.location.reload()
        onClose()
      } else {
        alert(deleteResponse.detail);
        onClose()
      }
    } catch (error) {
      alert("An error was encountered while deleting from the database", error);
    }
  }

  if (!isOpen) return null;
  return (
    <>
      <div className=" bottom-80 left-64 absolute flex items-center justify-center p-5 bg-white rounded-lg w-[40%]">
        <div className="gap-5 ">
          <div className="p-5">
            <p className="text-2xl">Are you sure you want to perform this action?</p>
          </div>

          <div className="flex justify-between">
            <div
              className={`justify-center py-3 mx-5 rounded text-center w-full cursor-pointer mb-3 flex items-center transition-colors bg-orange-100 text-orange-500 `}
            >
              <button id="1" onClick={onClose}>
                Cancel
              </button>
            </div>
            <div
              className={`justify-center py-3 mx-5 rounded text-center w-full cursor-pointer mb-3 flex items-center transition-colors bg-orange-100 text-orange-500 `}
            >
              <button id="1" onClick={() => handleDeleteClick(res)}>
                Delete record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
