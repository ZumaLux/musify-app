import React from "react";
import { useToken } from "../hooks/useToken";

export const Discover = () => {
  const { accessToken } = useToken();
  return <div>Discover {accessToken}</div>;
};
