import React from "react";
import { authorize } from "../api/authorize";
import { login_uri } from "../assets/constants";

export const Login = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <a href={login_uri}>Login</a>
      {/* <button
        className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-4 rounded"
        onClick={() => authorize()}
      >
        LOGIN TO ABDIFY
      </button> */}
    </div>
  );
};
