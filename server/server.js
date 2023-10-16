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

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri_auth = "http://localhost:5000/callback";
const redirect_uri = "http://localhost:3030";
const stateKey = "spotify_auth_state";

// PORT
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// TEST
app.get("/", (req, res) => {
  res.json({ users: ["One", "Two", "Three"] });
});

// LOGIN (GET AUTH CODE & STATE)
app.get("/login", (req, res) => {
  // const getAuth = async () => {
  //   res.redirect(
  //     `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
  //   );
  // };
  // getAuth();
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri_auth,
        state: state,
      })
  );
});

var generateRandomString = function (length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// TOKEN (GET ACCESS TOKEN)
app.get("/callback", (req, res) => {
  console.log("callback");
  const code = req.query.code;
  const state = req.query.state;

  if (state === null) {
    res.redirect(
      redirect_uri +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri_auth,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const refresh_token = body.refresh_token;
      const expires_in = body.expires_in;

      const cookieConfig = { maxAge: expires_in, secure: true, httpOnly: true };

      // cookie
      res.cookie("access_token", access_token, cookieConfig);
      res.cookie("refresh_token", refresh_token, cookieConfig);

      res.redirect(`${redirect_uri}?code=${""}&state=${state}`);
    } else {
      res.json({ error });
    }
  });
});

// API DATA REQUSTS
