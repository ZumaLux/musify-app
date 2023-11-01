const querystring = require("querystring");
const request = require("request");
const generateRandomString = require("../helpers/randomString");

// ENV
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/login";

// CLIENT_AUTH
const getAuth = (req, res) => {
  console.log("getAuth");
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
      })
  );
};

// LOGIN_USER (GET ACCESS TOKEN)
const getLoginToken = (req, res) => {
  const { code, state } = req.query || null;
  // console.log("code: ", code);
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

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body?.access_token;
      const refresh_token = body?.refresh_token;

      // console.log(req.cookies["connect.sid"]);
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      res.cookie("userIsLogged", "true");
      res.redirect("http://localhost:3030");
    } else {
      res.send(response.statusCode);
    }
  });
};

// GET REFRESHED TOKEN
const getRefreshedToken = (req, res, next) => {
  console.log("getRefreshedToken");
  var refresh_token = req.session.refresh_token;
  console.log("----- SESSION: ----- ", req.session);

  if (!refresh_token) return res.sendStatus(401);

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log("------ BODY ACCESS TOKEN: -------", body.access_token);

    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;

      req.session.access_token = access_token;
      req.session.save();
      console.log("sync: ", req.session.access_token);
      next();
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("userIsLogged");
  res.clearCookie("connect.sid");
  res.redirect("http://localhost:3030?unauthorized");
  console.log("logout");
};

module.exports = { getAuth, getLoginToken, getRefreshedToken, logout };

// use to request data from the API
// const options = {
//   url: "https://api.spotify.com/v1/me",
//   headers: { Authorization: "Bearer " + access_token },
//   json: true,
// };
// request.get(options, function (error, response, body) {});
