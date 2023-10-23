import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";

export const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

// URLs
export const base_uri = "http://localhost:3030"; // redirect home
export const spotify_base_url = "https://accounts.spotify.com";
export const login_uri = "http://localhost:5000/login";
export const refresh_token_uri = "http://localhost:5000/refresh_token";
// export const token_uri = "http://localhost:5000/token";
// Endpoints
export const spotify_auth_url = spotify_base_url + "/authorize";
