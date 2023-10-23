const querystring = require("querystring");
const request = require("request");
const generateRandomString = require("../helpers/randomString");

// ENV
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/login";

const getAuth = (req, res) => {
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

const getLoginToken = (req, res) => {
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

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body?.access_token;
      const refresh_token = body?.refresh_token;

      console.log(req.cookies["connect.sid"]);
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      res.cookie("userIsLogged", "true");
      res.redirect("http://localhost:3030");
    } else {
      res.send("error");
    }
  });

  // res.send(req.sessionID);
};

module.exports = { getAuth, getLoginToken };

// use to request data from the API
// const options = {
//   url: "https://api.spotify.com/v1/me",
//   headers: { Authorization: "Bearer " + access_token },
//   json: true,
// };
// request.get(options, function (error, response, body) {});
