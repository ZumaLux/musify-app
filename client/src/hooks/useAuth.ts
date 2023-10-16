import { useState, useEffect } from "react";
import axios from "axios";
import { token_uri } from "../assets/constants";

export const useAuth = (code: string) => {
  // state for all three things the server returns
  const [accessToken, setAccessToken] = useState("");
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    // request accessToken
    if (!code) return;
    const authState = () => {
      var b = document.cookie.match("(^|;)\\s*" + "spotify_auth_state" + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    };
    console.log(document.cookie);

    axios.post(token_uri, { state: authState(), code: code }).then((res) => {
      console.log("res data: ", res.data);
      setAccessToken(res.data.access_token);
      setExpiresIn(res.data.expires_in);
    });
  }, [code]);

  return accessToken;
};
