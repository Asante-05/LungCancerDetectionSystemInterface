import { useState } from "react";
import { loginUser } from "./Services/Services";

export function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [logInState, setLogInState] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = async (event) => {
    event.preventDefault();
    try {
      const response_data = await loginUser(email, password);

      if (response_data.email || response_data.password) {
        if (response_data.email) {
          alert(response_data.email[0]);
        }
        if (response_data.password) {
          alert(response_data.password[0]);
        }
      } else {
        // console.log(response.detail)
        // setLogInState(true)
        // window.location.href = '/Main'
      }
      if (!response_data.ok) {
        alert(response_data.non_field_errors[0]);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src="/pre.jpg"
            alt=""
          ></img>
        </div>
        <div className="bg-white-500 flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto bg-orange-500 bg-opacity-50 p-8 px-8 rounded-lg ">
            <h2 className="text-4xl text-white font-bold text-center">
              SIGN IN
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-white">Emial</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder=""
                className="rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-white">Password</label>
              <input
                value={password}
                hidden={false}
                onChange={(e) => setPassword(e.target.value)}
                className=" rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                type="password"
              />
            </div>
            <div className="flex justify-between text-white py-2">
              <p className="flex items-center ">
                <input className="mr-2" type="checkbox" />
                Remember Me
              </p>
              <p>Forgot Password</p>
            </div>

            <button
              className="w-full my-5 py-2 bg-orange-500 bg-opacity-50 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 font-semibold rounded-lg text-white"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
