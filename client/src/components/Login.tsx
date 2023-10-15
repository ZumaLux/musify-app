import React from "react";
const client_id = "1bc7e0846dd842839ade050b7413af64";
const redirect_uri = "http://localhost:3030";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export const Login = () => {
  return (
    <div>
      <a href={AUTH_URL}>
        <div>Login</div>
      </a>
    </div>
  );
};
