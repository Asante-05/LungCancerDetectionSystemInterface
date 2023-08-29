import { forwardRef } from "react";

import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";

const SideBar = forwardRef(({ showNav }, ref) => {
  const location = useLocation();

  // Check if the current pathname is "/"
  const isRootPath = location.pathname === "/home";
  const isPatientPath = location.pathname == "/patient";

  const isBillingPath = location.pathname == "/billing";

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-center mt-6 mb-14">
            <picture>
              <img
                className="w-32 h-auto"
                src="/lungnetcenterblack.png"
                alt="company logo"
              />
            </picture>
          </div>
          <div className="flex flex-col">
            <Link to="/home">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  isRootPath
                    ? "bg-b200 text-orange-500"
                    : "text-gray-400 hover:bg-b100 hover:text-blue"
                }`}
              >
                <div className="mr-2">
                  <HomeIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Dashboard</p>
                </div>
              </div>
            </Link>

            <Link to="/patient">
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  isPatientPath
                    ? "bg-b200 text-orange-500"
                    : "text-gray-400 hover:bg-b100 hover:text-blue"
                }`}
              >
                <div className="mr-2">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p>Patient</p>
                </div>
              </div>
            </Link>
          </div>
        </div>v
        <div className="mb-10">
          
          <div>
            <Popover className="relative">
              <Popover.Button className="outline-none w-full mr-5 md:mr-8 cursor-pointer text-gray-700">
                <div
                  className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                    isBillingPath
                      ? "bg-b200 text-orange-500"
                      : "text-gray-400 hover:bg-b100 hover:text-blue-500"
                  }`}
                >
                  <div className="mr-2">
                    <img src="/logout.svg" className="h-5 w-5" />
                  </div>
                  <div>
                    <p>Logout</p>
                  </div>
                </div>
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
                <Popover.Panel className=" ">
                  <div className="relative w-auto bg-b100 p-3 rounded-md shadow-lg">
                    <div className="flex">
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          Are you sure?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-10">
                      <button>
                        <div
                          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors w-full ${
                            isBillingPath
                              ? "bg-b200 text-orange-500"
                              : "text-gray-400 hover:bg-b200 hover:text-orange-500"
                          }`}
                        >
                          <div>
                            <Link to={"/"}>
                              <p>Yes</p>
                            </Link>
                          </div>
                        </div>
                      </button>
                      <button>
                        <div
                          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors w-full ${
                            isBillingPath
                              ? "bg-b200 text-orange-500"
                              : "text-gray-400 hover:bg-b200 hover:text-orange-500"
                          }`}
                        >
                          <div>
                            <p>No</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>{" "}
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
