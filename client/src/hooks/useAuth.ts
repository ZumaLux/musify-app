import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = (code: string) => {
  // state for all three things the server returns
  const [accessToken, setAccessToken] = useState("");
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    // request accesToken
    if (!code) return;
    axios.get("http://localhost:5000/login").then((res) => {
      setAccessToken(res.data.access_token);
      setExpiresIn(res.data.expires_in);
    });
  }, [code]);

  return accessToken;
};
