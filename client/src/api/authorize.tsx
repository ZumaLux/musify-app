import { client_id, base_uri, spotify_auth_url } from "../assets/constants";

const generateRandomString = function (length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(string: Uint8Array) {
    return btoa(String.fromCharCode.apply(null, Array.from(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(new Uint8Array(digest));
}

const codeVerifier = generateRandomString(128);

let urlParams = new URLSearchParams();

if (typeof window !== "undefined") {
  urlParams = new URLSearchParams(window.location.search);
}

export const authorize = () => {
  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateRandomString(16);
    let scope = "user-read-private user-read-email streaming";

    localStorage.setItem("code_verifier", codeVerifier);

    let args = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: base_uri,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = spotify_auth_url + args;
  });
};
