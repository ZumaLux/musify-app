import React, { useEffect, useState } from "react";

export const useToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const id = import.meta.env.VITE_CLIENT_SECRET;

  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    },
  };

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", authParameters);
    // .then((result) => result.json())
    // .then((data) => setAccessToken(data));
  }, []);

  useEffect(() => {
    // console.log(accessToken);
    console.log(import.meta.env.VITE_CLIENT_SECRET);
  }, [accessToken]);

  return { accessToken };
};
