import React from "react";
import { login_uri } from "../assets/constants";

export const Login = () => {
  return (
    <div>
      <a href={login_uri}>
        <div>Login</div>
      </a>
    </div>
  );
};
