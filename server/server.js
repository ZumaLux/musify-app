const express = require("express");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const request = require("request");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/token";

// PORT
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});

// LOGIN (GET AUTH CODE & STATE)
app.get("/login", async (req, res) => {
  const generateRandomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const state = generateRandomString(16);
  const scope = `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-library-modify
    user-library-read
    user-top-read
    playlist-read-private
    playlist-modify-public`;

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: redirect_uri,
        scope: scope,
        state: state,
      })
  );
});

// TOKEN (GET ACCESS TOKEN)
app.get("/token", async (req, res) => {
  const { code, state } = req.query || null;
  // if (state === null) {}

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  // get token
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body?.access_token;
      const refresh_token = body?.refresh_token;

      const options = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: "Bearer " + access_token },
        json: true,
      };

      res.redirect(
        "http://localhost:3030?" +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })
      );

      // use to request data from the API
      request.get(options, function (error, response, body) {});
    }
  });
});

// API DATA REQUSTS
